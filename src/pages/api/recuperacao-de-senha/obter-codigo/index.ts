import type { NextApiRequest, NextApiResponse } from 'next'

import apiBackend from '@/services/apiBackend'
import { AxiosError } from 'axios'

interface GetResetPasswordCodePayload {
  email: string
}

export default async function handler(
  req: NextApiRequest & { body: GetResetPasswordCodePayload },
  res: NextApiResponse
) {
  try {
    const response = await apiBackend({
      method: 'POST',
      url: `/forgot-password-code`,
      data: req.body
    })
    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>
    return res.status(axiosError.response?.status || 500).json(
      axiosError.response?.data.message || {
        message: 'Erro interno no servidor'
      }
    )
  }
}
