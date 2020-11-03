'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppointmentsSchema extends Schema {
  up () {
    this.create('appointments', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'))
      table.timestamp('date').notNullable().unique()
      table.uuid('user_id').references('id').inTable('users')
      table.uuid('provider_id').references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('appointments')
  }
}

module.exports = AppointmentsSchema
