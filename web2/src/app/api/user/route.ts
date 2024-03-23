import { NextResponse ,NextRequest} from 'next/server';
import { NextApiRequest } from 'next';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../lib/connectDB';
import { User } from '../../db_models/user';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const id = searchParams.get('id')

	await connectToDatabase();

	const user = await User.findById(id);

	if(!user) return NextResponse.json({ error: 'User Not Found' }, { status: 500 });

	return NextResponse.json({ status: 200, message: user });

}
