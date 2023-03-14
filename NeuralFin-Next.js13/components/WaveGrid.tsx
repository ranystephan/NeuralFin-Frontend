import { useEffect } from 'react';
import styles from '../styles';
import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const WaveGrid = () => {
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    const orbit = new OrbitControls(camera, renderer.domElement);

    const axesHelper = new THREE.AxesHelper(6);

    scene.add(axesHelper);

    camera.position.set(-10, 30, 30);
    orbit.update()

    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    const planeGeometry = new THREE.PlaneGeometry(30, 30);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.rotation.x = -Math.PI / 2;

    const gridHelper = new THREE.GridHelper(30);
    scene.add(gridHelper);

    const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);


    sphere.position.set(-10, 10, 0);

    const gui = new dat.GUI();

    const options = {
      sphereColor: '#ffea00',
      wireframe: false
    };

    gui.addColor(options, 'sphereColor').onChange(function(e){
      sphere.material.color.set(e);
    });


    gui.add(options, 'wireframe').onChange(function(e){
      sphere.material.wireframe = e;
    });
    

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
