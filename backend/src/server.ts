import { ApolloServer } from "apollo-server-express"
import * as cors from "cors"
import * as express from "express"
import * as fs from "fs"
import { Resolvers, User } from "../types"
import { AuthToken, createAuthToken, verifyToken } from "./auth"
import db from "./db"

const typeDefs = fs.readFileSync(__dirname + "/../../schema.graphql", "utf8")

const resolvers: Resolvers = {
  Query: {
    me: async (parent, {}, { user }) => {
      return user ? { id: user.id, email: user.email } : null
    }
  },
  Mutation: {
    login: async (parent, { email, password }, ctx) => {
      try {
        const token = await createAuthToken(email, password)
        return { success: true, token }
      } catch (err) {
        return { success: true, error: String(err) }
      }
    }
  }
}

const main = async () => {
  await db().raw("select 1")

  const app = express()
  app.use(cors())

  // If auth header is present, add user info to the request
  app.use(async (req, res, next) => {
    const auth = req.headers.authorization
    if (auth != null && auth.startsWith("Bearer")) {
      const token = auth.substr(7)
      let payload: AuthToken
      try {
        payload = verifyToken(token)
      } catch (err) {
        res.status(400).send("bad token")
        return
      }
      let user: User
      try {
        user = await db()
          .first()
          .from("users")
          .where("id", payload.userId)
      } catch (err) {
        res.status(500).send('user not found"')
        return
      }
      // @ts-ignore
      req.user = user
    }
    next()
  })

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Add user info to resolver context
      // @ts-ignore
      return { user: req.user }
    }
  })
  server.applyMiddleware({ app, path: "/" })

  const port = Number(process.env.PORT || 4000)
  app.listen({ port }, () => {
    console.log(`🚀  Server ready at http://localhost:${port}/`)
  })
}

main().catch(err => console.error(err))
