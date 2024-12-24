import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Mvote extends BaseModel {
  public static table = "votters"
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare img_name: string

  @column()
  declare vote: number
  @column()
  declare whovote: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}