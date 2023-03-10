import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const WaveGrid = () => {
  const canvasRef = useRef(null);
  const gridGeometry = new THREE.GridGeometry(10, 10, 100, 100);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas });

    // Create grid mesh
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const grid = new THREE.LineSegments(gridGeometry, material);
    scene.add(grid);

    // Create wave animation
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      const vertices = gridGeometry.vertices;
      vertices.forEach((vertex) => {
        const distance = Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y);
        vertex.z = Math.sin(distance * 2.0 + time * 10.0) * 0.2;
      });
      gridGeometry.verticesNeedUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up Three.js scene
    return () => {
      scene.remove(grid);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default WaveGrid;
