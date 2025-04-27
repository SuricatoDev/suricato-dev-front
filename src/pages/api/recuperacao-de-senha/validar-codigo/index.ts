import type { NextApiRequest, NextApiResponse } from 'next'

import apiBackend from '@/services/apiBackend'
import { AxiosError } from 'axios'

interface ResetPasswordValidateCodePayload {
  email: string
  code: string
}

export default async function handler(
  req: NextApiRequest & { body: ResetPasswordValidateCodePayload },
  res: NextApiResponse
) {
  try {
    const response = await apiBackend({
      method: 'POST',
      url: `/reset-password-validate-code`,
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
