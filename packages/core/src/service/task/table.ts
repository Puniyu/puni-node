import { createSqlite } from '@puniyu/core/db/sqlite'
import { puniPathTaskDb } from '@puniyu/root'
import { DataTypes } from 'sequelize'

const sqlite = await createSqlite(`${puniPathTaskDb}/task.db`)

export const table = sqlite.define('task', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  }
})
