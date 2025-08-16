import type { GitPullOptions, GitPullResult } from '@puniyu/types/utils/git/pull'
import { exists } from '@puniyu/utils/fs/fsPromise'
import { git, isGitRepo } from '@puniyu/utils/git/base'
import { getLocalCommitHash, getRemoteCommitHash } from '@puniyu/utils/git/commit'
/**
 * 构建pull返回值
 * @param status 是否成功
 * @param currentHash 当前哈希
 * @param remoteHash 远程哈希
 * @param data 更新信息
 * @param prefix data前缀
 * @returns 返回值
 */
const pullResult = (
  status: boolean,
  currentHash: string | null,
  remoteHash: string | null,
  message: string
): GitPullResult => {
  return {
    status,
    data: message,
    hash: {
      before: currentHash,
      after: remoteHash
    }
  }
}

/**
 * 拉取git仓库
 * @param cwd 工作目录 默认当前目录
 * @param options 选项
 * @returns 拉取结果
 */
export const pull = async (repoPath: string, options?: GitPullOptions): Promise<GitPullResult> => {
  try {
    if (!(await exists(repoPath))) return pullResult(false, null, null, '仓库不存在')
    if (!(await isGitRepo(repoPath))) return pullResult(false, null, null, '仓库不存在')
    /** 获取当前的哈希值 */
    const currentCommit = await getLocalCommitHash(repoPath)
    const currentHash = currentCommit?.hash ?? null
    /** 获取远程哈希值 */
    const remoteCommit = await getRemoteCommitHash(repoPath)
    const remoteHash = remoteCommit?.hash ?? null

    if (currentHash === remoteHash) {
      return pullResult(false, currentHash, remoteHash, '当前已经是最新版本')
    }
    const client = git(repoPath)
    await client.fetch('origin')
    if (options?.force) {
      await client.reset(['--hard', 'origin/HEAD'])
      const repo = await getLocalCommitHash(repoPath)
      return pullResult(true, currentHash, repo?.hash ?? null, '本地分支已强制与远程分支同步')
    }

    await client.pull()
    const repo = await getLocalCommitHash(repoPath)
    return pullResult(true, currentHash, repo?.hash ?? null, '更新成功')
  } catch (error) {
    return pullResult(false, null, null, `发生错误: ${(error as Error).message}`)
  }
}
