import { startScheduler } from '../jobs/scheduler.js';

export const startJobs = (req, res) => {
    startScheduler();
    res.json({ message: 'Job scheduler started' });
};
