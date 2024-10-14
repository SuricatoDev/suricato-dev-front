export interface CNPJData {
  razaoSocial: string;
  nomeFantasia: string;
  telefone: string;
  logradouro: string;
  complemento: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  uf: string;
}

/**
 * Busca informações de uma empresa utilizando o CNPJ.
 * @param cnpj O CNPJ a ser buscado (ex.: '12.345.678/0001-95').
 * @returns Dados da empresa, como razão social, nome fantasia, telefone e endereço.
 */
export async function fetchCNPJInfo(cnpj: string): Promise<CNPJData> {
  const formattedCNPJ = cnpj.replace(/\D/g, '');

  const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${formattedCNPJ}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar o CNPJ');
  }

  const data = await response.json();

  if (data.status !== 'OK') {
    throw new Error('CNPJ não encontrado ou inválido');
  }

  return {
    razaoSocial: data.nome,
    nomeFantasia: data.fantasia || '',
    telefone: data.telefone || '',
    logradouro: data.logradouro || '',
    complemento: data.complemento || '',
    numero: data.numero || '',
    bairro: data.bairro || '',
    cidade: data.municipio || '',
    cep: data.cep || '',
    uf: data.uf || ''
  };
}
