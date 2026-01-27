import cron from 'node-cron'
import { syncRevenue } from '../core/revenueSync.js'

cron.schedule('*/10 * * * *', async ()=>{ await syncRevenue() })
