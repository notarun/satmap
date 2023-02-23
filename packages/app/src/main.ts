import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import SeedScene from './scene';
import './style.css';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer();
const seedScene = new SeedScene();

scene.add(seedScene);

camera.position.set(0, 0, 3);
camera.lookAt(0, 0, 0);

function onAnimationFrameHandler() {
  renderer.render(scene, camera);
  seedScene?.update && seedScene?.update();
  window.requestAnimationFrame(onAnimationFrameHandler);
};

function windowResizeHandler() {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}

windowResizeHandler();
window.requestAnimationFrame(onAnimationFrameHandler);
window.addEventListener('resize', windowResizeHandler);
document.body.appendChild(renderer.domElement);
