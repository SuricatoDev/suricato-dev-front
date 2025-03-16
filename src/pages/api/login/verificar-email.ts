import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { email } = req.body

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'O parâmetro "email" é obrigatório' })
  }

  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/verificar-email`,
      { email }
    )

    return res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Erro ao verificar usuário:', error)
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data)
    }
    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
}
