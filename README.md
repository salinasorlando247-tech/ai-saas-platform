# ForgeAI Backend

This repository contains the **backend of ForgeAI**, built with Node.js, Express, and BullMQ.

## Features
- Handles all faceless AI video generation jobs
- Referrals and usage tracking
- Predictive analytics engine
- Secure API endpoints for frontend
- Redis + BullMQ job queue management

## Setup
\\\ash
npm install
npm start
\\\

## Deployment
- Recommended deployment: Railway or Render (Node 18+)
- Required environment variables:
  - PORT
  - JWT_SECRET
  - DATABASE_URL
  - STRIPE_SECRET
  - REDIS_URL
