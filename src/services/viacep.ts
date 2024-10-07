export async function fetchAddressByCep(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar o CEP');
  }
  const data = await response.json();
  if (data.erro) {
    throw new Error('CEP não encontrado');
  }
  return data;
}
