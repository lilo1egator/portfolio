import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const NUM_STARS_FAR = 7000;
const NUM_STARS_MID = 3200;
const NUM_STARS_NEAR = 400;
const STAR_COLOR = 0xffffff;

const Starfield = () => {
  const mountRef = useRef();

  useEffect(() => {
    let frameId;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    camera.position.z = 400;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x090d18, 1);

    // Дальній шар
    const geometryFar = new THREE.BufferGeometry();
    const positionsFar = [];
    const colorsFar = [];
    for (let i = 0; i < NUM_STARS_FAR; i++) {
      const R = 500 + Math.random() * 800;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.sin(phi) * Math.sin(theta);
      const z = R * Math.cos(phi);
      positionsFar.push(x, y, z);
      const color = new THREE.Color(STAR_COLOR);
      colorsFar.push(color.r * 0.32, color.g * 0.32, color.b * 0.32);
    }
    geometryFar.setAttribute('position', new THREE.Float32BufferAttribute(positionsFar, 3));
    geometryFar.setAttribute('color', new THREE.Float32BufferAttribute(colorsFar, 3));
    const materialFar = new THREE.PointsMaterial({ vertexColors: true, size: 0.7, opacity: 0.8, transparent: true });
    const starsFar = new THREE.Points(geometryFar, materialFar);
    scene.add(starsFar);

    // Функція для створення текстури круга
    function createCircleTexture() {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
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

    // Середній шар
    const geometryMid = new THREE.BufferGeometry();
    const positionsMid = [];
    const colorsMid = [];
    for (let i = 0; i < NUM_STARS_MID; i++) {
      const R = 600 + Math.random() * 600;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.sin(phi) * Math.sin(theta);
      const z = R * Math.cos(phi);
      positionsMid.push(x, y, z);
      const color = new THREE.Color(STAR_COLOR);
      colorsMid.push(color.r * 0.8, color.g * 0.8, color.b * 0.8);
    }
    geometryMid.setAttribute('position', new THREE.Float32BufferAttribute(positionsMid, 3));
    geometryMid.setAttribute('color', new THREE.Float32BufferAttribute(colorsMid, 3));
    const materialMid = new THREE.PointsMaterial({
      vertexColors: true,
      size: 1.5,
      opacity: 0.8,
      transparent: true,
      map: createCircleTexture(),
      alphaTest: 0.5,
      sizeAttenuation: true
    });
    const starsMid = new THREE.Points(geometryMid, materialMid);
    scene.add(starsMid);

    // Ближній шар
    const geometryNear = new THREE.BufferGeometry();
    const positionsNear = [];
    const colorsNear = [];
    for (let i = 0; i < NUM_STARS_NEAR; i++) {
      const R = 200 + Math.random() * 200;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.sin(phi) * Math.sin(theta);
      const z = R * Math.cos(phi);
      positionsNear.push(x, y, z);
      const color = new THREE.Color(STAR_COLOR);
      colorsNear.push(color.r * 1.0, color.g * 1.0, color.b * 1.0);
    }
    geometryNear.setAttribute('position', new THREE.Float32BufferAttribute(positionsNear, 3));
    geometryNear.setAttribute('color', new THREE.Float32BufferAttribute(colorsNear, 3));
    const materialNear = new THREE.PointsMaterial({
      vertexColors: true,
      size: 1.3,
      opacity: 0.95,
      transparent: true,
      map: createCircleTexture(),
      alphaTest: 0.5,
      sizeAttenuation: true
    });
    const starsNear = new THREE.Points(geometryNear, materialNear);
    scene.add(starsNear);

    // Animation
    function animate() {
      starsFar.rotation.y += 0.0007;
      starsFar.rotation.x += 0.0002;
      starsMid.rotation.y += 0.0009;
      starsMid.rotation.x += 0.00025;
      starsNear.rotation.y += 0.0012;
      starsNear.rotation.x += 0.00035;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    mountRef.current.appendChild(renderer.domElement);
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }} />
    </div>
  );
};

export default Starfield; 