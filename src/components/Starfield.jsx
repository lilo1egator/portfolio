import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const NUM_STARS_FAR = 4500;
const NUM_STARS_MID = 2600;
const NUM_STARS_NEAR = 250;
const STAR_COLOR = 0xffffff;

const Starfield = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let frameId;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.3);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x090d18, 1);

    container.appendChild(renderer.domElement);

    function createCircleTexture() {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 2, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'white';
      ctx.shadowBlur = 8;
      ctx.fill();

      return new THREE.CanvasTexture(canvas);
    }

    const circleTexture = createCircleTexture();

    // ========= ДАЛЬНІЙ ШАР =========
    const geometryFar = new THREE.BufferGeometry();
    const positionsFar = [];
    const colorsFar = [];
    const baseColorFar = new THREE.Color(STAR_COLOR);

    for (let i = 0; i < NUM_STARS_FAR; i++) {
      const R = 500 + Math.random() * 800;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.sin(phi) * Math.sin(theta);
      const z = R * Math.cos(phi);

      positionsFar.push(x, y, z);
      colorsFar.push(baseColorFar.r * 0.32, baseColorFar.g * 0.32, baseColorFar.b * 0.32);
    }

    geometryFar.setAttribute('position', new THREE.Float32BufferAttribute(positionsFar, 3));
    geometryFar.setAttribute('color', new THREE.Float32BufferAttribute(colorsFar, 3));

    const materialFar = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.7,
      opacity: 0.8,
      transparent: true
    });

    const starsFar = new THREE.Points(geometryFar, materialFar);
    scene.add(starsFar);

    // ========= СЕРЕДНІЙ ШАР =========
    const geometryMid = new THREE.BufferGeometry();
    const positionsMid = [];
    const colorsMid = [];
    const baseColorMid = new THREE.Color(STAR_COLOR);

    for (let i = 0; i < NUM_STARS_MID; i++) {
      const R = 600 + Math.random() * 600;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.sin(phi) * Math.sin(theta);
      const z = R * Math.cos(phi);

      positionsMid.push(x, y, z);
      colorsMid.push(baseColorMid.r * 0.8, baseColorMid.g * 0.8, baseColorMid.b * 0.8);
    }

    geometryMid.setAttribute('position', new THREE.Float32BufferAttribute(positionsMid, 3));
    geometryMid.setAttribute('color', new THREE.Float32BufferAttribute(colorsMid, 3));

    const materialMid = new THREE.PointsMaterial({
      vertexColors: true,
      size: 1.5,
      opacity: 0.8,
      transparent: true,
      map: circleTexture || undefined,
      alphaTest: 0.5,
      sizeAttenuation: true
    });

    const starsMid = new THREE.Points(geometryMid, materialMid);
    scene.add(starsMid);

    // ========= БЛИЖНІЙ ШАР =========
    const geometryNear = new THREE.BufferGeometry();
    const positionsNear = [];
    const colorsNear = [];
    const baseColorNear = new THREE.Color(STAR_COLOR);

    for (let i = 0; i < NUM_STARS_NEAR; i++) {
      const R = 200 + Math.random() * 200;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.sin(phi) * Math.sin(theta);
      const z = R * Math.cos(phi);

      positionsNear.push(x, y, z);
      colorsNear.push(baseColorNear.r, baseColorNear.g, baseColorNear.b);
    }

    geometryNear.setAttribute('position', new THREE.Float32BufferAttribute(positionsNear, 3));
    geometryNear.setAttribute('color', new THREE.Float32BufferAttribute(colorsNear, 3));

    const materialNear = new THREE.PointsMaterial({
      vertexColors: true,
      size: 1.3,
      opacity: 0.95,
      transparent: true,
      map: circleTexture || undefined,
      alphaTest: 0.5,
      sizeAttenuation: true
    });

    const starsNear = new THREE.Points(geometryNear, materialNear);
    scene.add(starsNear);

    // ========= ANIMATE =========
    const animate = () => {
      starsFar.rotation.y += 0.0007;
      starsFar.rotation.x += 0.0002;

      // обертаємо середні
      starsMid.rotation.y += 0.0009;
      starsMid.rotation.x += 0.00025;

      // обертаємо ближні
      starsNear.rotation.y += 0.0012;
      starsNear.rotation.x += 0.00035;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    >
      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default Starfield;