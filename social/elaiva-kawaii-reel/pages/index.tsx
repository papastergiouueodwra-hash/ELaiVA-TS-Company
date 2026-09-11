import dynamic from 'next/dynamic';

const ReelPlayer = dynamic(() => import('../src/ReelPlayer'), { ssr: false });

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#111', display: 'grid', placeItems: 'center', padding: 24 }}>
      <ReelPlayer />
    </main>
  );
}
