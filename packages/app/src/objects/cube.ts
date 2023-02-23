import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

export default class Cube extends Mesh {
  constructor() {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    super(geometry, material);
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }
}
