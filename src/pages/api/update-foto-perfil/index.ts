/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import FormData from 'form-data'
import fs from 'fs'
import apiBackend from '@/services/apiBackend'
import { getToken } from 'next-auth/jwt'
import { AxiosError } from 'axios'

export const config = {
  api: {
    bodyParser: false
  }
}

const parseForm = (
  req: NextApiRequest
): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false })
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token || !token.id) {
    return res.status(403).json({ message: 'Acesso negado' })
  }

  let fields, files
  try {
    ;({ fields, files } = await parseForm(req))
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao processar o formulário' })
  }

  const uploadedFile = files.foto_perfil || files.file
  if (!uploadedFile) {
    return res.status(422).json({ message: 'Nenhuma foto enviada' })
  }

  const file = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile

  const filePath = file.filepath || file.path
  if (!filePath) {
    return res
      .status(422)
      .json({ message: 'Caminho do arquivo não encontrado' })
  }

  const fileData = fs.readFileSync(filePath)

  const backendFormData = new FormData()
  backendFormData.append('foto_perfil', fileData, file.originalFilename)

  const userId = String(token.id)
  const tokenType = token.token_type || 'Bearer'
  const accessToken = token.access_token

  try {
    const response = await apiBackend({
      method: 'POST',
      url: `/update-foto-perfil/${userId}`,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        ...backendFormData.getHeaders()
      },
      data: backendFormData
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
