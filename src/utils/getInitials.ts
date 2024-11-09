export function getInitials(fullName: string): string {
  const nameParts = fullName.trim().split(' ');
  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase();
  }
  const firstInitial = nameParts[0][0].toUpperCase();
  const lastInitial = nameParts[nameParts.length - 1][0].toUpperCase();

  return `${firstInitial}${lastInitial}`;
}
