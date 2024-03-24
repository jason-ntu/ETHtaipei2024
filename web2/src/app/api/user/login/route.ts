import { NextResponse ,NextRequest} from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../lib/connectDB';
import { User } from '../../../db_models/user';

export async function POST(req: NextRequest){
	await connectToDatabase();
	
	const { email, password} = await req.json();

	
	const user = await User.findOne({ email: email }).exec();


  	if (user){
		if(user.password == password) return NextResponse.json({ status: 200, message: {userId: user._id} });
		else return NextResponse.json({ error: 'Incorrect Password' }, { status: 500 })
	}

	return NextResponse.json({ error: 'Account Doesn\'t Exists' }, { status: 500 })

}

export async function OPTIONS(){
	return NextResponse.json({ status: 200});
}
