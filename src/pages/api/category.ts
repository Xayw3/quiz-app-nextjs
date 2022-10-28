import Category from '../../models/Category'
import dbConnect from "../../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from 'next';
 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const categories = await Category.find({});

        res.status(200).json({ res: 'ok', data: categories})

      } catch (error) {
          res.status(500).json({ message: 'Server error' })
      }
      break
    case 'POST': 
      try {
        const { title } = JSON.parse(req.body)
        const category = await Category.create({ title })

        res.status(201).json({ res: 'ok', category})

      } catch (error) {
          res.status(500).json({ success: false, message: 'Server error' })
      }
      break
    default:
      res.status(400).json({ message: 'Not Found' })
  }
}

export default handler