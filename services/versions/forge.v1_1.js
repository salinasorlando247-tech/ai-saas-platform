export const processForgeV1_1 = forge => {
  return {
    ...forge,
    processingProfile: 'adaptive',
    captionsEnabled: true,
    autoHookOptimization: true
  }
}
