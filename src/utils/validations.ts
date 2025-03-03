export function checkPasswordStrength(
  password: string,
  userName?: string,
  userEmail?: string
): boolean {
  if (!password) return false

  if (userName && password.toLowerCase().includes(userName.toLowerCase())) {
    return false
  }
  if (userEmail) {
    const emailPart = userEmail.split('@')[0]
    if (password.toLowerCase().includes(emailPart.toLowerCase())) {
      return false
    }
  }

  if (password.length < 8) return false
  const hasNumber = /\d/.test(password)
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  if (hasNumber || hasSymbol) return true
  return false
}
