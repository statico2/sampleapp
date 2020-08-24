import * as Knex from "knex"
import * as bcrypt from "bcryptjs"

export async function seed(knex: Knex): Promise<any> {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert([
        { email: "test@sampleapp.local", password: bcrypt.hashSync("test") }
      ])
    })
}
