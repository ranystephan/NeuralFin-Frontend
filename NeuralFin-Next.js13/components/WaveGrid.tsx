import { useEffect } from 'react';
import styles from '../styles';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const WaveGrid = () => {
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const orbit = new OrbitControls(camera, renderer.domElement);

    const axesHelper = new THREE.AxesHelper(6);

    scene.add(axesHelper);

    camera.position.set(0, 2, 5);
    orbit.update()

    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    box.rotation.x = 5;
    box.rotation.y = 5;

    function animate(time: number) {
      box.rotation.x = time / 1000;
      box.rotation.y = time / 1000;
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      // Clean up Three.js objects and event listeners
      renderer.setAnimationLoop(null);
      scene.remove(box);
      scene.remove(axesHelper);
      orbit.dispose();
      renderer.dispose();
    };
  }, []);

  return <div></div>;
};

export default WaveGrid;
