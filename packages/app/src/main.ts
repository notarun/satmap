import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SeedScene from './scene';
import './style.css';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer();
const seedScene = new SeedScene();
const controls = new OrbitControls(camera, renderer.domElement);

scene.add(seedScene);

function onAnimationFrameHandler() {
  renderer.render(scene, camera);
  seedScene?.update && seedScene?.update();
  window.requestAnimationFrame(onAnimationFrameHandler);
};

function windowResizeHandler() {
  const { innerHeight, innerWidth } = window;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.position.set(0, 0, 1.5);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  controls.minDistance = 0.7;
  controls.maxDistance = 4;
  controls.update();

  renderer.setSize(innerWidth, innerHeight);
}

windowResizeHandler();
window.requestAnimationFrame(onAnimationFrameHandler);
window.addEventListener('resize', windowResizeHandler);
document.body.appendChild(renderer.domElement);
