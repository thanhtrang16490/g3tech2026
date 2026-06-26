import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

// Brand Colors
const COLORS = {
  darkGray: '#3C3C3C',
  red: '#D71920',
  orange: '#F58220',
  white: '#FFFFFF',
};

// Types
interface BoxPieceProps {
  color: string;
  delay: number;
  initialX: number;
  initialY: number;
  initialRotate: number;
  isReducedMotion: boolean;
}

interface G3BoxLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Reusable BoxPiece Component - Now with text on front face
function BoxPiece({ 
  color, 
  delay, 
  initialX, 
  initialY, 
  initialRotate, 
  isReducedMotion,
  isFront = false,
  text
}: BoxPieceProps & { isFront?: boolean; text?: string }) {
  if (isReducedMotion) {
    return (
      <motion.div
        className="absolute w-16 h-16 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        {text && <span className="text-white font-bold text-lg">{text}</span>}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute w-16 h-16 rounded-xl flex items-center justify-center"
      style={{
        backgroundColor: color,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        transformOrigin: 'center',
        backfaceVisibility: 'hidden',
      }}
      initial={{
        opacity: 0,
        scale: 0.4,
        x: initialX,
        y: initialY,
        rotate: initialRotate,
      }}
      animate={{
        opacity: [0, 1, 1, 1, 1, 1, 0],
        scale: [0.4, 1, 1, 1, 1, 1, 0.4],
        x: [initialX, 0, 0, 0, 0, 0, initialX],
        y: [initialY, 0, 0, -4, -4, 0, initialY],
        rotate: [initialRotate, 0, 0, 0, 0, 0, initialRotate],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        times: [0, 0.2, 0.47, 0.67, 0.87, 0.93, 1],
        delay: delay,
      }}
    >
      {text && (
        <motion.span 
          className="text-white font-bold text-lg select-none"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
          animate={{
            opacity: [0, 0, 0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            times: [0, 0.47, 0.67, 0.73, 0.93, 1],
          }}
        >
          {text}
        </motion.span>
      )}
    </motion.div>
  );
}

// Glow Component
function Glow({ intensity = 1, isReducedMotion }: { intensity: number; isReducedMotion: boolean }) {
  if (isReducedMotion) return null;

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: `radial-gradient(circle at center, ${COLORS.orange}40, transparent 70%)`,
        filter: 'blur(20px)',
        transform: 'translateZ(-10px)',
      }}
      animate={{
        opacity: [0, 0.6 * intensity, 0.8 * intensity, 0.4 * intensity, 0],
        scale: [0.8, 1.2, 1.3, 1.1, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        times: [0, 0.47, 0.67, 0.87, 1],
      }}
    />
  );
}

// LogoText Component
function LogoText({ isReducedMotion }: { isReducedMotion: boolean }) {
  if (isReducedMotion) {
    return (
      <div className="flex items-baseline gap-0 mt-24">
        <span style={{ color: COLORS.red, fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '0.08em', fontSize: '1.5rem' }}>G3</span>
        <span style={{ color: COLORS.darkGray, fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '0.08em', fontSize: '1.5rem' }}>BOX</span>
      </div>
    );
  }

  return (
    <motion.div
      className="flex items-baseline gap-0 mt-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0, 0, 1, 1, 0],
        y: [20, 20, 20, 0, 0, 20],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeOut',
        times: [0, 0.47, 0.67, 0.73, 0.93, 1],
      }}
    >
      <span
        style={{
          color: COLORS.red,
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 700,
          letterSpacing: '0.08em',
          fontSize: '1.5rem',
        }}
      >
        G3
      </span>
      <span
        style={{
          color: COLORS.darkGray,
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 700,
          letterSpacing: '0.08em',
          fontSize: '1.5rem',
        }}
      >
        BOX
      </span>
    </motion.div>
  );
}

// Tagline Component
function Tagline({ isReducedMotion }: { isReducedMotion: boolean }) {
  if (isReducedMotion) {
    return (
      <p
        className="mt-2 text-sm font-medium"
        style={{ color: COLORS.darkGray, opacity: 0.7 }}
      >
        Open Ideas. Build Value.
      </p>
    );
  }

  return (
    <motion.p
      className="mt-3 text-sm font-medium"
      style={{ color: COLORS.darkGray }}
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: [0, 0, 0, 0, 0.7, 0.7, 0],
        y: [8, 8, 8, 8, 0, 0, 8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeOut',
        times: [0, 0.67, 0.8, 0.87, 0.9, 0.97, 1],
      }}
    >
      Open Ideas. Build Value.
    </motion.p>
  );
}

// Main Component
export default function G3BoxLogo3D({ size = 'md' }: G3BoxLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Mouse tracking for hover interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  // Continuous 3D rotation for the cube
  const cubeRotateY = useMotionValue(0);
  const cubeRotateX = useMotionValue(-15);
  
  // Auto-rotate the cube continuously
  useEffect(() => {
    if (!isReducedMotion) {
      let animationFrame: number;
      let startTime = Date.now();
      
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const yRotation = elapsed * 30; // 30 degrees per second
        const xRotation = -15 + Math.sin(elapsed * 0.5) * 5; // Gentle tilt
        
        cubeRotateY.set(yRotation % 360);
        cubeRotateX.set(xRotation);
        
        animationFrame = requestAnimationFrame(animate);
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    }
  }, [isReducedMotion, cubeRotateY, cubeRotateX]);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Mouse move handler - adds to the auto-rotation
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isReducedMotion) {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (e.clientX - centerX) * 0.1;
      const offsetY = (e.clientY - centerY) * 0.1;
      mouseX.set(offsetX);
      mouseY.set(offsetY);
    }
  }, [mouseX, mouseY, isReducedMotion]);

  // Size mapping
  const sizeScale = {
    sm: 0.6,
    md: 0.8,
    lg: 1,
    xl: 1.3,
  };

  return (
    <div
      className="relative cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onMouseMove={handleMouseMove}
      style={{
        transform: `scale(${sizeScale[size]})`,
        transformOrigin: 'center center',
      }}
    >
      <motion.div
        className="relative w-48 h-48"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background Glow */}
        <Glow intensity={isHovered ? 1.5 : 1} isReducedMotion={isReducedMotion} />

        {/* 3D Rotating Cube */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            rotateY: !isReducedMotion ? cubeRotateY : 0,
            rotateX: !isReducedMotion ? cubeRotateX : -15,
          }}
        >
          {/* Front Face - Red with G3 */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: COLORS.red,
              boxShadow: '0 8px 32px rgba(215,25,32,0.3)',
              transform: 'translateZ(32px)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 1, 1, 1, 1, 0],
              scale: [0.4, 1, 1, 1, 1, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              times: [0, 0.2, 0.47, 0.67, 0.87, 0.93, 1],
              delay: 0.1,
            }}
          >
            <motion.span 
              className="text-white font-bold text-xl select-none"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
              animate={{
                opacity: [0, 0, 0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                times: [0, 0.47, 0.67, 0.73, 0.93, 1],
              }}
            >
              G3
            </motion.span>
          </motion.div>

          {/* Back Face - Dark Gray */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl"
            style={{
              backgroundColor: COLORS.darkGray,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              transform: 'translateZ(-32px) rotateY(180deg)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 1, 1, 1, 1, 0],
              scale: [0.4, 1, 1, 1, 1, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              times: [0, 0.2, 0.47, 0.67, 0.87, 0.93, 1],
              delay: 0.3,
            }}
          />

          {/* Left Face - Dark Gray */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl"
            style={{
              backgroundColor: COLORS.darkGray,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              transform: 'translateX(-32px) rotateY(-90deg)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 1, 1, 1, 1, 0],
              scale: [0.4, 1, 1, 1, 1, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              times: [0, 0.2, 0.47, 0.67, 0.87, 0.93, 1],
              delay: 0,
            }}
          />

          {/* Right Face - Orange */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl"
            style={{
              backgroundColor: COLORS.orange,
              boxShadow: '0 8px 32px rgba(245,130,32,0.3)',
              transform: 'translateX(32px) rotateY(90deg)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 1, 1, 1, 1, 0],
              scale: [0.4, 1, 1, 1, 1, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              times: [0, 0.2, 0.47, 0.67, 0.87, 0.93, 1],
              delay: 0.2,
            }}
          />

          {/* Top Face - Light Red */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl"
            style={{
              backgroundColor: '#E8242C',
              boxShadow: '0 8px 32px rgba(232,36,44,0.3)',
              transform: 'translateY(-32px) rotateX(90deg)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 1, 1, 1, 1, 0],
              scale: [0.4, 1, 1, 1, 1, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              times: [0, 0.2, 0.47, 0.67, 0.87, 0.93, 1],
              delay: 0.15,
            }}
          />

          {/* Bottom Face - Dark Orange */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl"
            style={{
              backgroundColor: '#D5731A',
              boxShadow: '0 8px 32px rgba(213,115,26,0.3)',
              transform: 'translateY(32px) rotateX(-90deg)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 1, 1, 1, 1, 0],
              scale: [0.4, 1, 1, 1, 1, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              times: [0, 0.2, 0.47, 0.67, 0.87, 0.93, 1],
              delay: 0.25,
            }}
          />
        </motion.div>

        {/* Logo Text */}
        <LogoText isReducedMotion={isReducedMotion} />

        {/* Tagline */}
        <Tagline isReducedMotion={isReducedMotion} />
      </motion.div>
    </div>
  );
}
