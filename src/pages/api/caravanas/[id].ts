import type { NextApiRequest, NextApiResponse } from 'next'

import apiBackend from '@/services/apiBackend'
import { AxiosError } from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  try {
    const response = await apiBackend({
      method: req.method,
      url: `/caravanas/${id}`
    })

    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    return res
      .status(axiosError.response?.status || 500)
      .json(
        axiosError.response?.data || { message: 'Erro interno no servidor' }
      )
  }
}
