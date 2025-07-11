import { satisfies, SemVer } from 'semver'

const semver = (version: string) => new SemVer(version)

/**
 * 解析版本号
 * @param version 版本号
 * @example
 * ```ts
 * const { major, minor, patch, prerelease } = parseVersion('1.2.3-alpha.1')
 * -> { major: 1, minor: 2, patch: 3, prerelease: ['alpha', '1'] }
 * ```
 */
export const parseVersion = (version: string) => {
  const ver = semver(version)
  return {
    major: ver.major,
    minor: ver.minor,
    patch: ver.patch,
    prerelease: ver.prerelease
  }
}

/**
 * 检查版本是否满足指定范围
 * @param version 要检查的版本号
 * @param range 版本范围表达式 (如 '>=1.2.3 <2.0.0')
 * @returns 是否满足范围要求
 * @example
 * ```ts
 * isVersionInRange('1.2.3', '^1.0.0') // true
 * isVersionInRange('2.0.0', '~1.2.3') // false
 * ```
 */
export const isVersionInRange = (version: string, range: string) => {
  return satisfies(version, range)
}

export const version = {
  parse: parseVersion,
  satisfies: isVersionInRange
}
