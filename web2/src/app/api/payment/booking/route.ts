import { NextResponse ,NextRequest} from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../lib/connectDB';
import { User } from '../../../db_models/user';
import Booking from '../../../db_models/booking';
import Hotel from '../../../db_models/hotel';
import { sendUSDC, sendCCM } from '../../../../../helper/circleHelper';

export async function POST(req: NextRequest) {

	await connectToDatabase();

	const { userId, hotelId } = await req.json();

	const user = await User.findById(userId);
	if(!user) return NextResponse.json({ error: 'User Not Found' }, { status: 500 });

	const hotel = await Hotel.findById(hotelId);
	if(!hotel) return NextResponse.json({ error: 'Hotel Not Found' }, { status: 500 });

	// send token to us

	const status = await sendCCM(user.walletId, process.env.ADMIN_WALLET_ADDR, String(hotel.price));

	if (!status.isSent) return NextResponse.json({ error: 'CCM Transaction failed' }, { status: 500 });

	const CCM_txHash = status.txHash;

	// send NFT to them - added in next MVP phase

	// add booking info

	const newBooking = new Booking({
		userId,
		hotelId,
		CCM_txHash,
		CCR_txHash: '0x996c06bc6f6e809b12a552c13331747de7902dcdb757387f260662fc4cee042b',
	});

	await newBooking.save();


	return NextResponse.json({ status: 200, message: {bookingId: newBooking._id}});

}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const bookingId = searchParams.get('id')

	await connectToDatabase();

	const BookingOrder = await Booking.findById(bookingId);

	const user = await User.findById(BookingOrder.userId);
	const hotel = await Hotel.findById(BookingOrder.hotelId);

	return NextResponse.json({ status: 200, message: {user: user, hotel: hotel, transactions: {
		CCM_txHash: BookingOrder.CCM_txHash,
		CCR_txHash: BookingOrder.CCR_txHash,
	}}});

}

export async function OPTIONS(){
	return NextResponse.json({ status: 200});
}