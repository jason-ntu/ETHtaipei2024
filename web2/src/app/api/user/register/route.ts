import { NextResponse ,NextRequest} from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../lib/connectDB';
import { User } from '../../../db_models/user';
import fetch from 'node-fetch';
import forge from 'node-forge';
import { v4 as uuidv4 } from 'uuid';

const url = 'https://api.circle.com/v1/w3s/developer/wallets';

export async function POST(req: NextRequest){
	await connectToDatabase();
	
	// user registered info
	const { name, email, password } = await req.json();
	
	const user = await User.findOne({ email: email }).exec();

  	if (user) return NextResponse.json({ error: 'Account Exists', status: 500 })

	// generate cipher secret

	// fetch public key
	let key;
	await fetch('https://api.circle.com/v1/w3s/config/entity/publicKey', {
		method: 'GET',
		headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`}
	})
		.then(res => res.json())
		.then(json => {
			key = json.data.publicKey;
		})
		.catch(err => console.error('error:' + err));
	
	// generate entity secret
	const secret = process.env.CIRCLE_ENTITY_SECRET;
	const entitySecret = forge.util.hexToBytes(secret)
	const publicKey = forge.pki.publicKeyFromPem(key)
	const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', {
		md: forge.md.sha256.create(),
		mgf1: {
			md: forge.md.sha256.create(),
		},
	})
	const entitySecretCipherText = forge.util.encode64(encryptedData);


	// create a new wallet for user
	const options = {
		method: 'POST',
		headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`},
		body: JSON.stringify({
		  idempotencyKey: uuidv4(),
		  entitySecretCipherText: entitySecretCipherText,
		  blockchains: ['ETH-SEPOLIA'],
		  count: 1,
		  walletSetId: '018e6b33-68d6-7915-991c-f30e78687a29'
		})
	};

	let walletId;
	let walletAddress;

	// create wallet
	await fetch(url, options)
		.then(res => res.json())
		.then(json => {
			console.log(json)
			walletId = json.data.wallets[0].id;
			walletAddress = json.data.wallets[0].address;
		})
		.catch(err => console.error('error:' + err));


	if (!walletId || !walletAddress)  return NextResponse.json({ error: 'Wallet Error' }, { status: 500 });

	// add account info to User db
	const newUser = new User({
		name,
		email,
		password,
		walletId,
		walletAddress,
	});

	await newUser.save();

	return NextResponse.json({ status: 200, message: {userId: newUser._id} });
}

export async function OPTIONS(){
	return NextResponse.json({ status: 200});
}