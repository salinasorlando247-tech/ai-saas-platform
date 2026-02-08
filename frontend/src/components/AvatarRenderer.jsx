import { useEffect, useRef } from 'react';
import { playAudioBuffer } from '../utils/audioUtils.js';

export default function AvatarRenderer({ avatar, voiceBuffer, emotion, gestures }) {
  const avatarRef = useRef();

  useEffect(() => {
    if (!voiceBuffer) return;

    // Play voice
    playAudioBuffer(voiceBuffer);

    // Timeline animation logic
    const timeline = avatarRef.current.timeline || [];
    timeline.forEach(frame => {
      // Apply gestures, mouth movement, blinking, and emotion
      avatarRef.current.setExpression(frame.emotion || emotion);
      avatarRef.current.setGesture(frame.gesture || gestures.default);
    });
  }, [voiceBuffer, emotion, gestures]);

  return <div ref={avatarRef} className="avatar-scene" />;
}
