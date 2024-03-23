import { NextResponse ,NextRequest} from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../lib/connectDB';
import { User } from '../../../db_models/user';

export async function POST(req: NextRequest){
	await connectToDatabase();
	
	const { name, email, password, walletAddress} = await req.json();
	
	const user = await User.findOne({ email: email }).exec();

  	if (user) return NextResponse.json({ error: 'Account Exists', status: 500 })

	// add account info to User db
	const newUser = new User({
		name,
		email,
		password,
		walletAddress,
	});

	await newUser.save();

	return NextResponse.json({ status: 200, message: {userId: newUser._id} });
}
