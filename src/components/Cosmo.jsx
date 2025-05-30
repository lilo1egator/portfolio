import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Loader } from '@react-three/drei';
import { useRef, useState, Suspense } from 'react';

function CosmoModel(props) {
  const { scene } = useGLTF('/model/cosmo-optimized.glb');
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25;
    }
  });
  return <primitive ref={ref} object={scene} {...props} />;
}

export default function Cosmo({ height }) {
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const containerRef = useRef();

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: height ? `${height}px` : 240,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Suspense fallback={<Loader />}>
        <div style={{ width: '100%', height: '100%', transition: 'opacity 0.7s', opacity: canvasLoaded ? 1 : 0 }}>
          <Canvas
            shadows
            camera={{ position: [0, 0, 3], fov: 40 }}
            aria-label="3D astronaut model"
            onCreated={() => setCanvasLoaded(true)}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow color="#fff" />
            <CosmoModel scale={[0.6, 0.6, 0.6]} position={[0, 0, 0]} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minAzimuthAngle={-Infinity}
              maxAzimuthAngle={Infinity}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
            />
          </Canvas>
        </div>
      </Suspense>
    </div>
  );
} 