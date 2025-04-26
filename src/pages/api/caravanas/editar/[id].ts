import type { NextApiRequest, NextApiResponse } from 'next'

import axios, { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'

export const config = {
  api: { bodyParser: false }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token?.id) {
    return res.status(403).json({ message: 'Acesso negado' })
  }

  const { id } = req.query
  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'ID da caravana inválido' })
  }

  const forwardHeaders = { ...req.headers }
  delete forwardHeaders.host
  forwardHeaders.Authorization = `${token.token_type ?? 'Bearer'} ${token.access_token}`

  try {
    const axiosRes = await axios.post(
      `${process.env.BACKEND_URL}/caravanas/${id}`,
      req,
      {
        headers: forwardHeaders,
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    )

    return res.status(axiosRes.status).json(axiosRes.data)
  } catch (err) {
    const axiosError = err as AxiosError

    console.error(
      axiosError.response?.status,
      axiosError.response?.data || axiosError.message
    )

    const status = axiosError.response?.status ?? 500
    const payload =
      axiosError.response?.data && typeof axiosError.response.data === 'object'
        ? axiosError.response.data
        : { message: axiosError.message || 'Erro interno no servidor' }

    return res.status(status).json(payload)
  }
}
