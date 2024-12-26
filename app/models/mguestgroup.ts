import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MguestGroup extends BaseModel {
  public static table = 'quest_groups'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare org_name: string
}