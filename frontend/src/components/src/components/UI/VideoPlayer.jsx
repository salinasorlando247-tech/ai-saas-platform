import ReactPlayer from 'react-player';

export default function VideoPlayer({ src }) {
  return (
    <div className="mt-2">
      <ReactPlayer url={src} controls width="100%" />
    </div>
  );
}
