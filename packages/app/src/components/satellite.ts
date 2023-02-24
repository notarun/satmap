import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

// https://mattloftus.github.io/2016/02/03/threejs-p2/
export default class Satellite extends Mesh {
  constructor(
    private r = 0.5,
    private theta = 1,
    private dThetha = 2 * Math.PI / 100000
  ) {
    const geometry = new BoxGeometry(0.02, 0.02, 0.02);
    const material = new MeshBasicMaterial({ color: 0xea0405 });

    super(geometry, material);
  }

  update() {
    this.theta -= this.dThetha;
    this.position.x = this.r * Math.cos(this.theta);
    this.position.z = this.r * Math.sin(this.theta);
  }
}
