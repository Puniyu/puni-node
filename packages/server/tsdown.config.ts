import { defineConfig, type Options } from 'tsdown'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const pkg = JSON.parse(fs.readFileSync(new URL('package.json', import.meta.url), 'utf-8'))

export const options: Options =({
  entry: ['src/index.ts'],      // 入口文件
  format: ['cjs', 'esm'],       // ESM格式
  nodeProtocol: true,             // 使用Node.js协议
  unbundle: false,                 // 打包依赖
  dts: true,                    // 生成类型声明文件
  clean: true,                  // 清理dist目录
  minify: true,                 // 压缩生产环境代码
  target: 'node22',             // 指定ECMAScript目标版本
  sourcemap: false,              // 生成sourcemap
  treeshake: true,              // 启用树摇优化
  platform: 'node',            // 指定为Node.js环境
  outDir: 'dist',               // 指定输出目录 
  external: Object.keys(pkg.dependencies),                 // 外部依赖, 不打包进输出文件中
  hooks(hooks) {
    hooks.hook('build:done', () => {
      copyFiles()
    })
  },
})

export default defineConfig(options)

const copyFiles = () => {
  const file_name_path = fileURLToPath(import.meta.url)
  const file_path = dirname(file_name_path)

  const distDir = path.join(file_path, 'dist')

  // 删除 .d.cts 文件
  fs.readdirSync(distDir).forEach((file) => {
    if (file.endsWith('.d.cts')) {
      fs.rmSync(path.join(distDir, file))
    }
    if (file.endsWith('.js')) {
      const oldPath = path.join(distDir, file)
      const newPath = path.join(distDir, file.replace('.js', '.mjs'))
      fs.renameSync(oldPath, newPath)
    }
  })

  console.log('构建目录成功!')
}