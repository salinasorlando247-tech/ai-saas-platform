class ForgeAI {
  constructor(apiKey, tier) {
    if (!apiKey) throw new Error('API key required')
    this.apiKey = apiKey
    this.tier = tier
  }

  async autoCreate({ industry }) {
    if (this.tier === 'free') throw new Error('Limited access, upgrade to Pro/Elite')
    return fetch('/api/forge/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ industry })
    }).then(r => r.json())
  }
}
window.ForgeAI = ForgeAI
