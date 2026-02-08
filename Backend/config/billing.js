export const TIERS = {
  free: {
    aiSeconds: 300,
    gpuSeconds: 60,
    watermark: true
  },
  pro: {
    aiSeconds: 5000,
    gpuSeconds: 1200,
    watermark: false
  },
  growth: {
    aiSeconds: 20000,
    gpuSeconds: 6000,
    watermark: false
  },
  elite: {
    aiSeconds: Infinity,
    gpuSeconds: Infinity,
    watermark: false
  }
}
