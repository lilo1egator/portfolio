import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Loader } from '@react-three/drei';
import { useRef, useEffect, useState, Suspense } from 'react';

function MoonModel(props) {
  const { scene } = useGLTF('/model/moon-optimized.glb');
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25; // повільне автообертання
    }
  });
  return <primitive ref={ref} object={scene} {...props} />;
}

export default function Moon() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    // Intersection Observer для lazy load
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: 320, margin: '140px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isVisible ? (
        <Suspense fallback={<Loader />}> 
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 40 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow color="#fff" />
            <MoonModel scale={[3, 3, 3]} />
            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
        </Suspense>
      ) : (
        <div style={{ width: 64, height: 64 }}><Loader /></div>
      )}
    </div>
  );
}

// Для завантаження glb-моделей drei кешує їх автоматично 