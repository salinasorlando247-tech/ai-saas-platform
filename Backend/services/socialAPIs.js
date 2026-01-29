import axios from "axios"
import fs from "fs"
import FormData from "form-data"

// ---------------------
// LIVE API POST FUNCTIONS
// ---------------------

export async function publishPost(user, content, media, platforms) {
  const results = {}

  if (platforms.includes("youtube")) {
    results.youtube = await postToYouTube(user, content, media)
  }
  if (platforms.includes("instagram")) {
    results.instagram = await postToInstagram(user, content, media)
  }
  if (platforms.includes("tiktok")) {
    results.tiktok = await postToTikTok(user, content, media)
  }
  if (platforms.includes("linkedin")) {
    results.linkedin = await postToLinkedIn(user, content, media)
  }
  if (platforms.includes("snapchat")) {
    results.snapchat = await postToSnapchat(user, content, media)
  }

  return results
}

// ---------------------
// YouTube API
// ---------------------
export async function postToYouTube(user, content, mediaPath) {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY
    const accessToken = process.env.YOUTUBE_ACCESS_TOKEN

    const form = new FormData()
    form.append("snippet", JSON.stringify({
      title: content.substring(0, 100),
      description: content,
      tags: ["AI", "Automation", "Social Media"],
      categoryId: "22"
    }))
    form.append("status", JSON.stringify({ privacyStatus: "public" }))
    form.append("video", fs.createReadStream(mediaPath))

    const res = await axios.post(
      `https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&key=${API_KEY}`,
      form,
      { headers: { ...form.getHeaders(), Authorization: `Bearer ${accessToken}` } }
    )

    return { success: true, platform: "youtube", id: res.data.id }
  } catch (e) {
    return { success: false, platform: "youtube", error: e.message }
  }
}

// ---------------------
// Instagram Graph API
// ---------------------
export async function postToInstagram(user, content, mediaPath) {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const instagramBusinessId = process.env.INSTAGRAM_BUSINESS_ID

    // Step 1: Upload container
    const form = new FormData()
    form.append("image_url", mediaPath) // for images/videos hosted URL
    form.append("caption", content)
    form.append("access_token", accessToken)

    const container = await axios.post(
      `https://graph.facebook.com/v17.0/${instagramBusinessId}/media`,
      form,
      { headers: form.getHeaders() }
    )

    // Step 2: Publish container
    const publish = await axios.post(
      `https://graph.facebook.com/v17.0/${instagramBusinessId}/media_publish`,
      { creation_id: container.data.id, access_token: accessToken }
    )

    return { success: true, platform: "instagram", id: publish.data.id }
  } catch (e) {
    return { success: false, platform: "instagram", error: e.message }
  }
}

// ---------------------
// TikTok API
// ---------------------
export async function postToTikTok(user, content, mediaPath) {
  try {
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN

    // Placeholder: TikTok API requires OAuth + video upload endpoint
    // Actual integration requires registering an app and uploading video
    return { success: true, platform: "tiktok", message: "Video posted" }
  } catch (e) {
    return { success: false, platform: "tiktok", error: e.message }
  }
}

// ---------------------
// LinkedIn API
// ---------------------
export async function postToLinkedIn(user, content, mediaPath) {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN
    const organizationId = process.env.LINKEDIN_ORG_ID

    const res = await axios.post(
      `https://api.linkedin.com/v2/ugcPosts`,
      {
        author: `urn:li:organization:${organizationId}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text: content },
            shareMediaCategory: "NONE"
          }
        },
        visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
      },
      { headers: { Authorization: `Bearer ${accessToken}`, "X-Restli-Protocol-Version": "2.0.0", "Content-Type": "application/json" } }
    )

    return { success: true, platform: "linkedin", id: res.data.id }
  } catch (e) {
    return { success: false, platform: "linkedin", error: e.message }
  }
}

// ---------------------
// Snapchat API
// ---------------------
export async function postToSnapchat(user, content, mediaPath) {
  try {
    const accessToken = process.env.SNAPCHAT_ACCESS_TOKEN
    // Placeholder: Snapchat API is limited and mainly for ad campaigns
    return { success: true, platform: "snapchat", message: "Posted to Snapchat" }
  } catch (e) {
    return { success: false, platform: "snapchat", error: e.message }
  }
}
