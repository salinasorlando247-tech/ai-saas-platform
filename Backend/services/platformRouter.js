import * as platforms from './platforms/index.js'

export const postToPlatform = async (platform, payload) => {
  if (!platforms[platform]) {
    throw new Error(`Platform not supported: ${platform}`)
  }

  return platforms[platform].post(payload)
}
