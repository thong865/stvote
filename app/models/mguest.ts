import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type  { HasOne } from '@adonisjs/lucid/types/relations'
import MguestGroup from '#models/mguestgroup'

export default class Mguest extends BaseModel {
  public static table = 'invite_quests'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullname: string

  @column()
  declare org: number

  @column()
  declare dept: string

  @column()
  declare jobdesc: string

  @column()
  declare workdadds: string

  @column()
  declare remark: string

  @column()
  declare enter: Boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => MguestGroup,{
    localKey:'org',
    foreignKey:'id'
  })
  declare orgs: HasOne<typeof MguestGroup>
}