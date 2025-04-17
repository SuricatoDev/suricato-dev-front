import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import axios, { AxiosError } from 'axios'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token || !token.id) {
    return res.status(403).json({ message: 'Acesso negado' })
  }

  const tokenType = token.token_type || 'Bearer'
  const accessToken = token.access_token

  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'ID da caravana inválido' })
  }

  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.BACKEND_URL}/caravanas/${id}`,
      headers: {
        ...req.headers,
        host: '',
        Authorization: `${tokenType} ${accessToken}`
      },
      data: req.method === 'GET' || req.method === 'DELETE' ? undefined : req,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      responseType: 'stream'
    })

    res.status(response.status)
    response.data.pipe(res)
  } catch (error) {
    const axiosError = error as AxiosError
    console.error(
      'Erro ao fazer proxy para o backend:',
      axiosError.response?.data || axiosError
    )
    res
      .status(axiosError.response?.status || 500)
      .json(
        axiosError.response?.data || { message: 'Erro interno no servidor' }
      )
  }
}
