import { caravansMock } from '@/mocks/caravans'
import { NextApiRequest, NextApiResponse } from 'next'

const caravans = caravansMock

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  const caravan = caravans.find((p) => p.id === id)

  if (!caravan) {
    return res.status(404).json({ message: 'Caravan not found' })
  }

  res.status(200).json(caravan)
}
