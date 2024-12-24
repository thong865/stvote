import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Mvote from './mvote.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
export default class Mfile extends BaseModel {
  public static table = "file_uploads"

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare filename: string

  @column()
  declare ftype: string

  @column()
  declare stat: string

  @column()
  declare remark: string

  @column()
  declare iid: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Mvote, {
    localKey: 'iid',
    foreignKey: 'img_name'
  })
  declare votes: HasMany<typeof Mvote>
}