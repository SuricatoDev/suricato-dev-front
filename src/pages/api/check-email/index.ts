/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/api/check-email.ts
import type { NextApiRequest, NextApiResponse } from 'next'

async function getUserByEmail(email: string) {
  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const exists = email === 'geliandes@hotmail.com'

    return res.status(200).json({ exists })
  } catch (error) {
    console.error('Erro ao verificar email:', error)
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
}
