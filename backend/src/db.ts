import * as Knex from "knex"

export const config = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST || "db",
    user: process.env.POSTGRES_USER || "sampleapp",
    password: process.env.POSTGRES_PASSWORD || "sekrit",
    database: process.env.POSTGRES_DB || "sampleapp"
  },
  migrations: {
    // This is missing from the TypeScript types currently.
    stub: "migration.stub"
  }
}

const instance: Knex = Knex(config as Knex.Config)

console.log(
  `Will connect to postgres://${config.connection.user}@${config.connection.host}/${config.connection.database}`
)
instance
  .raw("select 1")
  .then(() => {
    console.log(`Connected to database - OK`)
  })
  .catch(err => {
    console.error(`Failed to connect to database: ${err}`)
    process.exit(1)
  })

export const db = () => instance

// Returns a timestamp suitable for inserting into Postgres
export const timestamp = (): string => new Date().toUTCString()

export default db
