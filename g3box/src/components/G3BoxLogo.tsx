import { useEffect, useState } from 'react';

interface G3BoxLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function G3BoxLogo({ size = 'md' }: G3BoxLogoProps) {
  const [animationPhase, setAnimationPhase] = useState(0);

  const sizeMap = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  useEffect(() => {
    // Animation sequence: 6 phases, each 1 second
    const sequence = [
      0, // Phase 0: Initial (hidden)
      1, // Phase 1: Cube flip - G3 BOX appears
      2, // Phase 2: Slogan appears
      3, // Phase 3: Tagline appears
      4, // Phase 4: Logo reappears
      5, // Phase 5: Hold
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sequence.length;
      setAnimationPhase(sequence[currentIndex]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${sizeMap[size]} px-3 py-2`}>
      {/* Decorative Line - Bottom Left */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: '20px',
          height: '2px',
          background: 'linear-gradient(to right, #D71920, transparent)',
          opacity: animationPhase === 1 || animationPhase === 4 || animationPhase === 5 ? 0.8 : 0,
          transition: 'all 0.7s ease-out',
        }}
      />
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: '2px',
          height: '20px',
          background: 'linear-gradient(to top, #D71920, transparent)',
          opacity: animationPhase === 1 || animationPhase === 4 || animationPhase === 5 ? 0.8 : 0,
          transition: 'all 0.7s ease-out',
        }}
      />

      {/* Decorative Line - Top Right */}
      <div
        className="absolute top-0 right-0"
        style={{
          width: '20px',
          height: '2px',
          background: 'linear-gradient(to left, #3C3C3C, transparent)',
          opacity: animationPhase === 1 || animationPhase === 4 || animationPhase === 5 ? 0.8 : 0,
          transition: 'all 0.7s ease-out',
        }}
      />
      <div
        className="absolute top-0 right-0"
        style={{
          width: '2px',
          height: '20px',
          background: 'linear-gradient(to bottom, #3C3C3C, transparent)',
          opacity: animationPhase === 1 || animationPhase === 4 || animationPhase === 5 ? 0.8 : 0,
          transition: 'all 0.7s ease-out',
        }}
      />
      {/* Logo Container with cube flip animation */}
      <div 
        className="relative flex items-center"
        style={{
          transform: animationPhase === 0 ? 'rotateX(-90deg) translateY(20px)' : 'rotateX(0deg) translateY(0px)',
          opacity: animationPhase === 0 ? 0 : 1,
          transition: 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          transformOrigin: 'center bottom',
        }}
      >
        {/* G3 - Red */}
        <span
          className="font-extrabold tracking-wide"
          style={{
            color: '#D71920',
          }}
        >
          G3
        </span>
        
        {/* BOX - Gray */}
        <span
          className="font-extrabold tracking-wide"
          style={{
            color: '#3C3C3C',
          }}
        >
          BOX
        </span>
      </div>
      
      {/* Slogan - "Open Ideas" */}
      <div
        className="text-xs font-semibold mt-1"
        style={{
          color: '#D71920',
          opacity: animationPhase >= 2 && animationPhase <= 4 ? 1 : 0,
          transform: animationPhase >= 2 && animationPhase <= 4 ? 'translateY(0px)' : 'translateY(-8px)',
          transition: 'all 0.5s ease-out',
          letterSpacing: '0.05em',
        }}
      >
        Open Ideas.
      </div>

      {/* Tagline - "Build Value" */}
      <div
        className="text-xs font-medium mt-0.5"
        style={{
          color: '#3C3C3C',
          opacity: animationPhase === 3 ? 1 : 0,
          transform: animationPhase === 3 ? 'translateY(0px)' : 'translateY(-8px)',
          transition: 'all 0.5s ease-out',
          letterSpacing: '0.03em',
        }}
      >
        Build Value.
      </div>
    </div>
  );
}
