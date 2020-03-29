import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import db from "./db"

const JWT_SECRET = process.env.JWT_SECRET || "sekrit"
if (!process.env.JWT_SECRET) {
  console.warn("Using insecure JWT_SECRET!")
}

export interface AuthToken {
  userId: string
}

export const createAuthToken = async (
  email: string,
  password: string
): Promise<string> => {
  const row = await db()
    .first("*")
    .from("users")
    .where("email", email)
  if (!row) {
    throw new Error("There is no user with that email address.")
  }
  if (bcrypt.compareSync(password, row.password)) {
    const payload: AuthToken = { userId: row.id }
    return jwt.sign(payload, JWT_SECRET)
  } else {
    throw new Error("Invalid password.")
  }
}

export const verifyToken = (token: string): AuthToken => {
  return jwt.verify(token, JWT_SECRET) as AuthToken
}
