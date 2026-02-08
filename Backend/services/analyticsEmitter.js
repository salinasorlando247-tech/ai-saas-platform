export const emitEvent = async (event) => {
  return fetch(process.env.ANALYTICS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...event,
      timestamp: Date.now(),
      anonymized: true
    })
  })
}
