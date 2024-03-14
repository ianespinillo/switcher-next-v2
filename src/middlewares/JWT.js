import jwt from 'jsonwebtoken'
export async function verifyToken (token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  if (!decoded) {
    return new Error('Invalid token')
  }
  return decoded.email
}
