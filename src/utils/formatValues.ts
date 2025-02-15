export function formatCPF(value: string): string {
  let digits = value.replace(/\D/g, '');
  digits = digits.substring(0, 11);

  if (digits.length > 9) {
    return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, '$1.$2.$3-$4');
  } else if (digits.length > 6) {
    return digits.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
  } else if (digits.length > 3) {
    return digits.replace(/^(\d{3})(\d{0,3}).*/, '$1.$2');
  } else {
    return digits;
  }
}

export function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, '');

  digits = digits.substring(0, 11);

  if (digits.length === 11) {
    return digits.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (digits.length === 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
  }
  return digits;
}

export function formatCEP(value: string): string {
  let digits = value.replace(/\D/g, '');
  digits = digits.substring(0, 8);

  if (digits.length > 5) {
    return digits.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
  }
  return digits;
}

export function formatCNPJ(value: string): string {
  const digits = value.replace(/\D/g, '').substring(0, 14);

  let formatted = digits;
  if (digits.length > 2) {
    formatted = digits.replace(/^(\d{2})(\d+)/, '$1.$2');
  }
  if (digits.length > 5) {
    formatted = formatted.replace(/^(\d{2})\.(\d{3})(\d+)/, '$1.$2.$3');
  }
  if (digits.length > 8) {
    formatted = formatted.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d+)/, '$1.$2.$3/$4');
  }
  if (digits.length > 12) {
    formatted = formatted.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d+)/, '$1.$2.$3/$4-$5');
  }
  return formatted;
}
