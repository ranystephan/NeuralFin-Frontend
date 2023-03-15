import { useEffect } from 'react';
import styles from '../styles';
import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const WaveGrid = () => {
  useEffect(() => {
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    const canvas = renderer.domElement;
    if (!document.body.contains(canvas)) {
      document.body.appendChild(canvas);
    }
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    const orbit = new OrbitControls(camera, renderer.domElement);

    const axesHelper = new THREE.AxesHelper(6);

    //scene.add(axesHelper);

    camera.position.set(-10, 30, 30);
    orbit.update()

    /* const boxGeometry = new THREE.BoxGeometry();
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
      wireframe: false,
      speed: 0.01
    };

    gui.addColor(options, 'sphereColor').onChange(function(e){
      sphere.material.color.set(e);
    });


    gui.add(options, 'wireframe').onChange(function(e){
      sphere.material.wireframe = e;
    });
    

    gui.add(options, 'speed', 0, 0.1);

    let step = 0;




    function animate(time: number) {
      box.rotation.x = time / 1000;
      box.rotation.y = time / 1000;

      step += options.speed;
      sphere.position.y = 10 * Math.abs(Math.sin(step));



      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate); */


/* const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -Math.PI / 2; */

/* const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper); */

const waveGrid = new THREE.Group();
const waveGridGeometry = new THREE.BoxGeometry(50, 50, 50, 50, 50, 50);
const waveGridMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide, wireframe: true });
const waveGridMesh = new THREE.Mesh(waveGridGeometry, waveGridMaterial);
waveGrid.add(waveGridMesh);
scene.add(waveGrid);
waveGrid.castShadow = true;


const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
/* const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
directionalLight.position.set(-50, 20, 0);
directionalLight.castShadow = true;


const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper); */


/* const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(-100, 50, 0);

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper); */

/* const gui = new dat.GUI();

const options = {
  wireframe: true,
  speed: 0.01,
  Wavecolor: '#ffea00'
};

gui.addColor(options, 'Wavecolor').onChange(function(e){
  waveGridMesh.material.color.set(e);
});


gui.add(options, 'wireframe').onChange(function(e){
  waveGridMesh.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1); */


let speed = 0.02;


let xOffset = 0;
let zOffset = 0;

function calculateVertexHeight(x: number, z: number, xOffset: number, zOffset: number): number {
  let frequency = 0.1;
  let amplitude = 2;
  let vertexHeight = Math.sin(x * frequency + xOffset) * Math.cos(z * frequency + zOffset) * amplitude;
  return vertexHeight;
}


function animate(time: number) {
  xOffset += speed;
  zOffset += speed;

  let positionAttribute = waveGridMesh.geometry.getAttribute('position');
  for (let i = 0; i < positionAttribute.count; i++) {
    let x = positionAttribute.getX(i);
    let z = positionAttribute.getZ(i);
    let vertexHeight = calculateVertexHeight(x, z, xOffset, zOffset);
    positionAttribute.setY(i, vertexHeight);
  }
  positionAttribute.needsUpdate = true;

  renderer.render(scene, camera);
};



renderer.setAnimationLoop(animate);



    



    return () => {
      // Clean up Three.js objects and event listeners
      renderer.setAnimationLoop(null);
      //scene.remove(box);
      scene.remove(waveGrid);
      scene.remove(axesHelper);
      orbit.dispose();
      renderer.dispose();
      //gui.destroy();
      document.body.removeChild(canvas);
    };
  }, []);

  return <div></div>;
};

export default WaveGrid;
