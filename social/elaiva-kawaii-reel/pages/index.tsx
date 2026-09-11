import { Player } from '@remotion/player';
import Reel from '../src/Reel';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#111', display: 'grid', placeItems: 'center', padding: 24 }}>
      <Player component={Reel} durationInFrames={540} compositionWidth={1080} compositionHeight={1920} fps={30} controls autoPlay loop style={{ width: 'min(420px, 92vw)', aspectRatio: '9/16', borderRadius: 24, overflow: 'hidden' }} />
    </main>
  );
}
