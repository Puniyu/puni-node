import path from 'path'
import { fileURLToPath } from 'url'

/** 当前文件的绝对路径 */
const filename = fileURLToPath(import.meta.url)

/** Puni根目录 */
export const puniPathRoot = Object.freeze(path.join(filename, '../..').replace(/\\/g, '/'))
/** 默认config目录 `npm/config/defSet` */
export const puniPathDefaultConfig = Object.freeze(path.join(puniPathRoot, 'config', 'defSet'))
/** 插件根目录 */
export const puniPathPlugins = Object.freeze(path.join(process.cwd(), 'plugins').replace(/\\/g, '/'))

/** 配置根目录 `@puni` */
export const puniPathBase = Object.freeze(path.join(process.cwd(), '@puni').replace(/\\/g, '/'))
/** adapter目录 `@puni/adapter` */
export const puniPathAdapter = Object.freeze(path.join(puniPathBase, 'adapter'))
/** logs目录 `@puni/logs` */
export const puniPathLogs = Object.freeze(path.join(puniPathBase, 'logs'))
/** config目录 `@puni/config` */
export const puniPathConfig = Object.freeze(path.join(puniPathBase, 'config'))
/** data目录 `@puni/data` */
export const puniPathData = Object.freeze(path.join(puniPathBase, 'data'))
/** 临时文件存储 `@puni/temp` */
export const puniPathTemp = Object.freeze(path.join(puniPathBase, 'temp'))
/** resource目录 `@puni/resource` */
export const puniPathResource = Object.freeze(path.join(puniPathBase, 'resource'))
/** db根目录 `@karinjs/data/db` */
export const puniPathDb = Object.freeze(path.join(puniPathBase, 'db'))
/** 任务数据库目录 `@puni/data/db/task` */
export const puniPathTaskDb = Object.freeze(path.join(puniPathBase, 'task'))
