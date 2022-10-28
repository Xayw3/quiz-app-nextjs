import dbConnect from "../../../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from 'next';
import User, { UserProps } from '../../../models/User';

export type ResponseProps = {
  message?: string,
  user?: UserProps
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseProps>) => {
  const { query } = req;

  if (!query.email) {
    res.status(400).json({ message: 'No email provided' })
  }

  await dbConnect();

  try {
    const { email } = query

    const user = (await User.findOne({ email })) as UserProps
    
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default handler