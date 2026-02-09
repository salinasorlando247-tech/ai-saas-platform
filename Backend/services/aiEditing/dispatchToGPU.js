import { gpuQueue } from '../../queues/gpuQueue.js';
import { v4 as uuid } from 'uuid';

export async function dispatchToGPU({ type, payload, tier }) {
  const priority =
    tier === 'elite' ? 1 :
    tier === 'growth' ? 2 :
    tier === 'pro' ? 3 : 5;

  return gpuQueue.add(
    'gpu-job',
    {
      jobId: uuid(),
      type,
      payload,
      tier,
      startedAt: Date.now(),
    },
    { priority }
  );
}
