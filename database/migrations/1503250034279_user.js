'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  async up () {

    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    await this.create('users', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'))
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('avatar')
      table.boolean('email_confirmed').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
