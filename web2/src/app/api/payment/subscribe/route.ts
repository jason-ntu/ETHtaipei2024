import { NextResponse ,NextRequest} from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../lib/connectDB';
import { User } from '../../../db_models/user';
import fetch from 'node-fetch';
import forge from 'node-forge';
import { v4 as uuidv4 } from 'uuid';
import { sendUSDC, sendCCM } from '../../../../../helper/circleHelper';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const id = searchParams.get('id')

	await connectToDatabase();

	const user = await User.findById(id);
	
	if(!user) return NextResponse.json({ error: 'User Not Found' }, { status: 500 });

	const status = await sendUSDC(user.walletId, process.env.ADMIN_WALLET_ADDR, '50');


	if (!status.isSent) return NextResponse.json({ error: 'USDC Transaction failed' }, { status: 500 });

	// execute contract on chain (to set the mapping of user subscribe to true)

	const ccm_status = await sendCCM(process.env.ADMIN_WALLET_ID, user.walletAddress, '200');

	const usdcTX = status.txHash;

	if (!ccm_status.isSent) return NextResponse.json({ error: 'CCM Transaction failed' }, { status: 500 });

	user.isSubscribe = true;
	await user.save();

	return NextResponse.json({ status: 200, message: {isSent: true, USDC_txHash: status.txHash, CCM_txHash: ccm_status.txHash}});

}

export async function OPTIONS(){
	return NextResponse.json({ status: 200});
}