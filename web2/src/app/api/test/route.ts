import { NextResponse ,NextRequest} from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../lib/connectDB';
import Hotel from '../../db_models/hotel';
import { v4 as uuidv4 } from 'uuid';
import forge from 'node-forge'
import crypto from 'crypto';


// .env test
export async function GET(request: NextRequest) {

	let key;
	await fetch('https://api.circle.com/v1/w3s/config/entity/publicKey', {
		method: 'GET',
		headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`}
	})
		.then(res => res.json())
		.then(json => {
			key = json.data.publicKey
		})
		.catch(err => console.error('error:' + err));

		console.log(key)

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
	console.log(entitySecretCipherText);

	return NextResponse.json({ status: 200});
}

