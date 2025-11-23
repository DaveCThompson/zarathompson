import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { atom } from 'jotai';

// Temporary atom for testing
const hueAtom = atom(0);

function App() {
  const [hue, setHue] = useAtom(hueAtom);

  // Simple animation loop to test OKLCH
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((h) => (h + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [setHue]);

  return (
    <div 
      style={{ 
        // This injects the dynamic value into the CSS variable
        '--dynamic-hue': hue 
      } as React.CSSProperties}
      className="min-h-screen flex flex-col items-center justify-center gap-4"
    >
      <h1 style={{ fontFamily: 'var(--font-brand)', fontSize: '3rem' }}>
        Zara Thompson Art
      </h1>
      
      <div style={{ 
        padding: '2rem', 
        background: 'var(--surface-glass)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--surface-glass-border)',
        backdropFilter: 'blur(10px)'
      }}>
        <p>Testing High Craft UI</p>
        <p style={{ color: 'var(--fg-accent)', fontWeight: 'bold' }}>
          Hue: {hue}
        </p>
      </div>
    </div>
  );
}

export default App;
