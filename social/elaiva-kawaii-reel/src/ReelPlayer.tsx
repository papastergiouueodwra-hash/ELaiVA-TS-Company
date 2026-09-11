import { Player } from '@remotion/player';
import Reel from './Reel';

export default function ReelPlayer() {
  return (
    <Player
      component={Reel}
      durationInFrames={780}
      compositionWidth={1080}
      compositionHeight={1920}
      fps={30}
      controls
      autoPlay
      loop
      style={{ width: 'min(420px, 92vw)', aspectRatio: '9/16', borderRadius: 24, overflow: 'hidden' }}
    />
  );
}
