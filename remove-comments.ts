import fs from 'fs'
import { glob } from 'glob'
import path from 'path'
import strip from 'strip-comments'

async function removeComments() {
  // Padrão para selecionar os arquivos TS e TSX na pasta src
  const pattern = path.join(process.cwd(), 'src/**/*.{ts,tsx}')

  try {
    const files = await glob(pattern) // <- Agora usamos await

    for (const file of files) {
      try {
        let code = fs.readFileSync(file, 'utf8')

        // Transformar comentários ESLint para protegidos (adiciona "!" caso não tenha)
        code = code
          .replace(/\/\*\s*(eslint[-\s])/g, '/*! $1')
          .replace(/\/\/\s*(eslint[-\s])/g, '//! $1')

        // Remove os comentários que não são protegidos, preservando os protegidos
        const strippedCode = strip(code, {
          keepProtected: true,
          preserveNewlines: false
        })

        // Opcional: reverter os comentários protegidos para o formato original
        const finalCode = strippedCode
          .replace(/\/\*! (\s*eslint[-\s])/g, '/* $1')
          .replace(/\/\/! (\s*eslint[-\s])/g, '// $1')

        fs.writeFileSync(file, finalCode, 'utf8')
        console.log(`Comentários removidos: ${file}`)
      } catch (error) {
        console.error(`Erro processando ${file}:`, error)
      }
    }
  } catch (err) {
    console.error('Erro ao buscar arquivos:', err)
  }
}

removeComments()
