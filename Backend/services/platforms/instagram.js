export const post = async ({ captionBase }) => {
  return {
    platform: 'instagram',
    caption: captionBase + ' #reels'
  }
}
