import fs from 'fs'
import path from 'path'
import glob from 'glob'
import strip from 'strip-comments'

// Padrão para selecionar os arquivos TS e TSX na pasta src
const pattern = path.join(process.cwd(), 'src/**/*.{ts,tsx}')

glob(pattern, (err, files) => {
  if (err) {
    console.error('Erro ao buscar arquivos:', err)
    return
  }
  files.forEach((file) => {
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
  })
})
