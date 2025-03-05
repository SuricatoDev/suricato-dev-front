import { caravansMock } from '@/mocks/caravans'
import { NextApiRequest, NextApiResponse } from 'next'

const caravans = caravansMock

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(caravans)
}
