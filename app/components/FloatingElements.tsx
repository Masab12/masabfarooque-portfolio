'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

export default function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const elements = [
    { size: 300, speed: 0.02, color: 'rgba(191,84,44, 0.15)', left: '10%', top: '20%' },
    { size: 350, speed: 0.015, color: 'rgba(63,88,168, 0.15)', left: '80%', top: '30%' },
    { size: 280, speed: 0.025, color: 'rgba(191,84,44, 0.12)', left: '20%', top: '70%' },
    { size: 320, speed: 0.018, color: 'rgba(63,88,168, 0.12)', left: '70%', top: '60%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          size={element.size}
          speed={element.speed}
          color={element.color}
          left={element.left}
          top={element.top}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          index={index}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

function FloatingElement({
  size,
  speed,
  color,
  left,
  top,
  mouseX,
  mouseY,
  index,
  isMobile,
}: {
  size: number;
  speed: number;
  color: string;
  left: string;
  top: string;
  mouseX: number;
  mouseY: number;
  index: number;
  isMobile: boolean;
}) {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const offsetX = !isMobile && windowSize.width ? (mouseX - windowSize.width / 2) * speed : 0;
  const offsetY = !isMobile && windowSize.height ? (mouseY - windowSize.height / 2) * speed : 0;

  const props = useSpring({
    transform: `translate(${offsetX}px, ${offsetY}px)`,
    config: { tension: 20, friction: 10 },
  });

  const floatAnimation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-30px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { duration: 4000 + index * 500 },
  });

  return (
    <animated.div
      style={{
        ...props,
        position: 'absolute',
        left,
        top,
        width: isMobile ? size * 0.6 : size,
        height: isMobile ? size * 0.6 : size,
        borderRadius: '50%',
        background: color,
        filter: 'blur(60px)',
        ...floatAnimation,
      }}
    />
  );
}
