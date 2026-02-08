import ffmpeg from 'fluent-ffmpeg';

export function applyEdits(inputPath, outputPath, decisions) {
  return new Promise((resolve) => {
    let command = ffmpeg(inputPath);

    decisions.forEach(decision => {
      if (decision.edit === 'quick-zoom') {
        command = command.videoFilters(
          `zoompan=z='if(lte(on,10),1.0,1.2)':d=25:x=iw/4:y=ih/4`
        );
      }
    });

    command
      .outputOptions('-preset veryfast')
      .save(outputPath)
      .on('end', resolve);
  });
}
