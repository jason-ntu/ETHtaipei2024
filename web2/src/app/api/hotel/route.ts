import { NextResponse ,NextRequest} from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../lib/connectDB';
import Hotel from '../../db_models/hotel';

// add hotel
export async function POST(req: NextRequest){
	await connectToDatabase();
	
	const { name, address, description, price, imageLink, tags, rating} = await req.json();
	

	// add account info to User db
	const newHotel = new Hotel({
		name,
		address,
		description,
		price,
		imageLink,
		tags,
		rating,
	});

	await newHotel.save();

	return NextResponse.json({ status: 200, message: {id: newHotel._id} });
}

// list all/one hotel
export async function GET(request: NextRequest) {

	const searchParams = request.nextUrl.searchParams
	const id = searchParams.get('id')

	await connectToDatabase();

	if (id) { // list one specific hotel
		const hotel = await Hotel.findById(id);
		if (hotel) return NextResponse.json({ status: 200, message: hotel })
		else return NextResponse.json({ error: 'Hotel Doesn\'t Exists' }, { status: 500 })

	} else {  // list all hotels
		const hotels = await Hotel.find({}).exec();
		return NextResponse.json({ status: 200, message: hotels });
	}

}

// add field (images, tags, rating)