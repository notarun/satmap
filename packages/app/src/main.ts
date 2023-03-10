import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { InteractionManager } from 'three.interactive';
import { renderSatInfo, renderSuggestions, setupSearch } from './dom';
import SeedScene from './scene';
import { getAllSatellites } from './services/satellites';
import './style.css';

(async () => {
  const satellitesData = await getAllSatellites();
  // @ts-ignore
  window.satellitesData = satellitesData;

  renderSuggestions();
  renderSatInfo();
  setupSearch(satellitesData);

  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const renderer = new WebGLRenderer();
  const controls = new OrbitControls(camera, renderer.domElement);
  const interactiveManager = new InteractionManager(renderer, camera, renderer.domElement);
  const seedScene = new SeedScene(satellitesData, interactiveManager);

  scene.add(seedScene);

  function onAnimationFrameHandler() {
    renderer.render(scene, camera);
    seedScene?.update && seedScene?.update();
    interactiveManager.update();
    window.requestAnimationFrame(onAnimationFrameHandler);
  };

  function windowResizeHandler() {
    const { innerHeight, innerWidth } = window;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.position.set(0, 0, 2);
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
})();
