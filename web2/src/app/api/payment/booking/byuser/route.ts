import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/connectDB";
import Booking from "../../../../db_models/booking";
import { User } from "../../../../db_models/user";
import Hotel from "../../../../db_models/hotel";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const id = searchParams.get('id')

	await connectToDatabase();

	const tempBookingOrder = await Booking.find({userId: id});

    let BookingOrder = [];

    for (let order of tempBookingOrder) {
        
        const user = await User.findById(order.userId);
        const hotel = await Hotel.findById(order.hotelId);
        BookingOrder.push({user: user, bookingId: order._id, hotel: hotel, transactions: {
            CCM_txHash: order.CCM_txHash,
            CCR_txHash: order.CCR_txHash,
        }})
    }

	return NextResponse.json({ status: 200, message: BookingOrder});

}