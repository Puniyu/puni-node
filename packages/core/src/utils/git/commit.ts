import type { GitCommitInfo } from '@puniyu/types/utils/git/commit'
import { git, isGitRepo } from '@puniyu/utils/git/base'
import { getDefaultBranch } from '@puniyu/utils/git/branch'

/**
 * 获取本地仓库的提交信息
 * @param repoPath 仓库路径
 * @returns 提交信息
 */
export const getLocalCommitHash = async (repoPath: string): Promise<GitCommitInfo | null> => {
  if (!(await isGitRepo(repoPath))) return null
  const hash = await git(repoPath).revparse(['HEAD'])
  return {
    branch: await getDefaultBranch(repoPath),
    hash: hash.trim(),
    short: hash.trim().slice(0, 7)
  }
}

/**
 * 获取远程仓库的提交信息
 * @param repoPath 仓库路径
 * @returns 提交信息
 */
export const getRemoteCommitHash = async (repoPath: string): Promise<GitCommitInfo | null> => {
  const hash = await git(repoPath).revparse(['origin/HEAD'])
  return {
    branch: await getDefaultBranch(repoPath),
    hash: hash.trim(),
    short: hash.trim().slice(0, 7)
  }
}
