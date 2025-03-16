import type { NextApiRequest, NextApiResponse } from 'next'
import apiBackend from '@/services/apiBackend'
import axios from 'axios'

interface CadastroPayload {
  nome: string
  data_nascimento: string
  telefone: string
  email: string
  password: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { nome, data_nascimento, telefone, email, password } =
    req.body as CadastroPayload

  if (!nome || !data_nascimento || !telefone || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Campos obrigatórios não informados.' })
  }

  try {
    const response = await apiBackend.post('/register', {
      nome,
      data_nascimento,
      telefone,
      email,
      password
    })

    return res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Erro ao processar cadastro:', error)

    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data)
    }

    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
}
