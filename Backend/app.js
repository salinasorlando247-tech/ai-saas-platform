const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const videoRoutes = require('./routes/videos.js');
const avatarRoutes = require('./routes/avatars.js');
const analyticsRoutes = require('./routes/analytics.js');
const templateRoutes = require('./routes/templates.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/avatars', avatarRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/templates', templateRoutes);

module.exports = app;
