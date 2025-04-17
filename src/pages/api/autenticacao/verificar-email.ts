import type { NextApiRequest, NextApiResponse } from 'next'

import axios, { AxiosError } from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/verificar-email`,
      req.body
    )
    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    return res
      .status(axiosError.response?.status || 500)
      .json(axiosError.response?.data || { error: 'Erro interno no servidor' })
  }
}
