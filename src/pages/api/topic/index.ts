import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Topics, { TopicsProps } from '../../../models/Topics';
 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  const { id } = query

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const topics = await Topics.findById(id)

        res.status(200).json({ res: 'ok', topics})

      } catch (error) {
          res.status(500).json({ message: 'Server error' })
      }
      break
      case "POST":
        try {
          const topicBody: TopicsProps = JSON.parse(req.body);
  
          const topic = await Topics.create(topicBody);
  
          res.status(201).json({ res: "ok", topic });
        } catch (e) {
          res.status(500).json({ message: "Inter server error" });
        }
        break;
    default:
      res.status(400).json({ message: 'Not Found' })
  }
}

export default handler