import mongoose from 'mongoose';
import User from '@/db_models/user';
import {connectToDatabase} from '../../lib/connectDB'


export default async function handler(req, res) {

  connectToDatabase();

  switch (req.method) {
    case 'POST':
      return login();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function login() {
    const { email, password } = req.body;
    const account = await User.findOne({ email: email }).exec();

    if (account) {
      if (password == account.password){
        return res.status(200).json({
          userId: account._id,
        });
      }

      return res.status(500).json({ message: 'Wrong Password' });
    }

    return res.status(500).json({ message: 'No Account' });
  }
}
