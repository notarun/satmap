import { Mesh, MeshBasicMaterial, SphereGeometry, TextureLoader } from 'three';
import earthMap from '../assets/earthmap1k.jpg';

// Links:
// - https://web.archive.org/web/20140209081927/http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/
// - https://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html
// - https://threejs.org/docs/#api/en/geometries/SphereGeometry
export default class Earth extends Mesh {
  constructor() {
    const geometry = new SphereGeometry(0.5, 32, 32);
    const material = new MeshBasicMaterial();

    material.map = (new TextureLoader).load(earthMap);

    super(geometry, material);
  }

  update() {
    this.rotation.x += 0.0005;
    this.rotation.y += 0.0005;
  }
}
