import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Topics, { TopicsProps } from "../../../models/Topics";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req

  const { key, id } = query

  await dbConnect()

  if (!key) {
    res.status(404).json({ message: 'Resource not found', topics: [] })
  } else {
    let topics: TopicsProps[]

    if (id) {
      topics = await Topics.find({ id: id })
    } else {
      topics = await Topics.find({ category_key: key })
    }

  }

  try {
    const topics = await Topics.find({ category_key: key })
    
    res.status(200).json({ res: 'ok', topics })
  } catch(error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default handler