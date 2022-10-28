import dbConnect from "../../../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../../config';
import User from '../../../models/User';

const bcrypt = require('bcryptjs')
 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({})

        res.status(200).json({ res: 'ok', data: users })

      } catch (error) {
          res.status(500).json({ message: 'Server error' })
      }
      break
    case 'POST': 
      try {
        const { email, password } = JSON.parse(req.body)

        const salt = bcrypt.genSaltSync(config.saltRounds)
        const hash = bcrypt.hashSync(password, salt)

        await User.create({ email, hash, })

        res.status(201).json({ res: 'ok' })

      } catch (error) {
          res.status(500).json({ success: false, message: 'Server error' })
      }
      break
    default:
      res.status(400).json({ message: 'Not Found' })
  }
}

export default handler