export function streamRender(progressCallback) {
  let progress = 0;

  const interval = setInterval(() => {
    progress += 10;
    progressCallback(progress);

    if (progress >= 100) clearInterval(interval);
  }, 300);
}
