import { NextApiRequest, NextApiResponse } from "next";
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../../../lib/connectDB';
import { User } from '../../../../../db_models/user';

export async function POST(req, res){
	connectToDatabase();
	
	const { name, email, password, walletAddress } = req.body;
  const account = await User.findOne({ email: email }).exec();

  if (account) return res.status(500).json({ message: 'Account Exists' });

	// add account info to User db
	const newUser = new User({
		name,
		email,
		password,
		walletAddress,
	});

	await newUser.save();

	return res.status(200).json({ 
		userId: newUser._id,
	});
}

/*
export default function handler(req, res) {

  connectToDatabase();
  console.log(res,req);

  switch (req.method) {
  	case 'POST':
    	return register(req, res);
		case 'GET':
			return res.status(200).json({ 
				message: "test",
			});
  	default:
    	return res.status(500).json({ 
				message: "Method not allowed"
			});
  }

  async function register(req,res) {
    const { name, email, password, walletAddress } = req.body;
    const account = await User.findOne({ email: email }).exec();

    if (account) return res.status(500).json({ message: 'Account Exists' });

		// add account info to User db
		const newUser = new User({
			name,
			email,
			password,
			walletAddress,
		});

		await newUser.save();

		return res.status(200).json({ 
			userId: newUser._id,
		});
		
  }
}
*/