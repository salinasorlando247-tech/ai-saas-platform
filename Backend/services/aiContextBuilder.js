export const buildAIContext = (user, basePrompt) => {
  let context = basePrompt

  if (user.marketplaceItems?.length) {
    user.marketplaceItems.forEach(item => {
      context += `\n\n${JSON.stringify(item)}`
    })
  }

  return context
}
