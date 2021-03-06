'use strict'

const { ServiceProvider } = require('@adonisjs/fold')


class CustomValidatorExistProvider extends ServiceProvider {
  boot () {
    const Database = use('Database')
    const Validator = use('Validator')

    const existsFn = async (data, field, message, args, get) => {

      const value = get(data, field)
      if (!value) {
        return
      }
      const [table, column] = args
      const row = await Database.table(table).where(column, value).first()

      if (!row) {
        throw message
      }
    }

    Validator.extend('exists', existsFn)
  }
}

module.exports = CustomValidatorExistProvider
