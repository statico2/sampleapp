import * as Knex from "knex"

exports.up = (knex: Knex) =>
  knex.schema
    .raw('create extension if not exists "uuid-ossp"')
    .createTable("users", t => {
      t.uuid("id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
      t.text("email").unique()
      t.text("password")
    })

exports.down = (knex: Knex) => knex.schema.dropTable("users")
