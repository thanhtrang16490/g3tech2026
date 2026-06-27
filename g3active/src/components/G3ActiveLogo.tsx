import { useEffect, useState } from 'react';

interface G3ActiveLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function G3ActiveLogo({ size = 'md' }: G3ActiveLogoProps) {
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
      1, // Phase 1: Logo appears - G3Active
      2, // Phase 2: Tagline appears
      3, // Phase 3: Subtitle appears
      4, // Phase 4: Hold
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
          background: 'linear-gradient(to right, #E53935, transparent)',
          opacity: animationPhase >= 1 ? 0.8 : 0,
          transition: 'all 0.7s ease-out',
        }}
      />
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: '2px',
          height: '20px',
          background: 'linear-gradient(to top, #E53935, transparent)',
          opacity: animationPhase >= 1 ? 0.8 : 0,
          transition: 'all 0.7s ease-out',
        }}
      />

      {/* Decorative Line - Top Right */}
      <div
        className="absolute top-0 right-0"
        style={{
          width: '20px',
          height: '2px',
          background: 'linear-gradient(to left, #1E1E1E, transparent)',
          opacity: animationPhase >= 1 ? 0.8 : 0,
          transition: 'all 0.7s ease-out',
        }}
      />
      <div
        className="absolute top-0 right-0"
        style={{
          width: '2px',
          height: '20px',
          background: 'linear-gradient(to bottom, #1E1E1E, transparent)',
          opacity: animationPhase >= 1 ? 0.8 : 0,
          transition: 'all 0.7s ease-out',
        }}
      />
      
      {/* Logo Container with animation */}
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
            color: '#E53935',
          }}
        >
          G3
        </span>
        
        {/* ACTIVE - Dark Gray */}
        <span
          className="font-extrabold tracking-wide"
          style={{
            color: '#1E1E1E',
          }}
        >
          ACTIVE
        </span>
      </div>
      
      {/* Tagline - "Move Smarter. Live Better." */}
      <div
        className="text-xs font-semibold mt-1"
        style={{
          color: '#E53935',
          opacity: animationPhase >= 2 ? 1 : 0,
          transform: animationPhase >= 2 ? 'translateY(0px)' : 'translateY(-8px)',
          transition: 'all 0.5s ease-out',
          letterSpacing: '0.05em',
        }}
      >
        Move Smarter. Live Better.
      </div>

      {/* Subtitle - "Active Tech & Personal Sports" */}
      <div
        className="text-xs font-medium mt-0.5"
        style={{
          color: '#1E1E1E',
          opacity: animationPhase >= 3 ? 1 : 0,
          transform: animationPhase >= 3 ? 'translateY(0px)' : 'translateY(-8px)',
          transition: 'all 0.5s ease-out',
          letterSpacing: '0.03em',
        }}
      >
        Active Tech & Personal Sports
      </div>
    </div>
  );
}
