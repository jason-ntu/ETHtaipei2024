import { NextResponse ,NextRequest} from 'next/server';
import { NextApiRequest } from 'next';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../lib/connectDB';
import { User } from '../../db_models/user';
import { getUSDC, getCCM } from '../../../../helper/circleHelper';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const id = searchParams.get('id')

	await connectToDatabase();

	const user = await User.findById(id);

	if(!user) return NextResponse.json({ error: 'User Not Found' }, { status: 500 });

	const USDC_amount = await getUSDC(user.walletId);
	const CCM_account = await getCCM(user.walletId);
	

	return NextResponse.json({ status: 200, message: {...user._doc, USDC_amount: USDC_amount, CCM_amount: CCM_account}});

}

export async function OPTIONS(){
	return NextResponse.json({ status: 200});
}


// Deposited USDC
// CCM (our token)