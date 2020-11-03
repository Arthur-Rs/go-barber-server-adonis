'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ForgotPasswordTokenSchema extends Schema {
  up () {
    this.create('forgot_password_tokens', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'))
      table.uuid('token').notNullable()
      table.uuid('user_id').references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('forgot_password_tokens')
  }
}

module.exports = ForgotPasswordTokenSchema
