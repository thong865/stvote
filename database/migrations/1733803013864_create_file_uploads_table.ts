import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'file_uploads'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('iid')
      table.string('filename')
      table.string('ftype')
      table.string('stat')
      table.string('remark')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}