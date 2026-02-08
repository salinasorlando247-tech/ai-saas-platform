let queue = [];

export const addToQueue = (job) => {
  queue.push(job);
};

export const processQueue = async () => {

  if (queue.length === 0) return;

  const job = queue.shift();

  await job();

  setTimeout(processQueue, 4000);
};
