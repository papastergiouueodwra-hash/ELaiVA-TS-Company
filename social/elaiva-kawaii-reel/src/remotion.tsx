import React from 'react';
import { registerRoot, Composition } from 'remotion';
import Reel from './Reel';

const Root: React.FC = () => (
  <Composition
    id="KawaiiReel"
    component={Reel}
    durationInFrames={780}
    fps={30}
    width={1080}
    height={1920}
  />
);

registerRoot(Root);
