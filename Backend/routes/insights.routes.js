router.get('/benchmarks', auth, async (req, res) => {
  const insights = await getBenchmarks(req.query)
  res.json(insights)
})

router.get('/trends', auth, async (req, res) => {
  const trends = await getTrends(req.query)
  res.json(trends)
})
