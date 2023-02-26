import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import { getLatLngObj } from 'tle.js';
import { calcPosFromLatLonRad } from '../utils';


// https://mattloftus.github.io/2016/02/03/threejs-p2/
export default class Satellite extends Mesh {
  constructor(
    private tle: string,
    private r = 0.6,
    // private theta = 1,
    // private dThetha = 2 * Math.PI / 10000
  ) {
    const geometry = new SphereGeometry(0.01);
    const material = new MeshBasicMaterial({ color: 0xfdcf09 });
    super(geometry, material);
  }

  update() {
    // this.theta = this.dThetha;
    // this.position.x = this.r * Math.cos(this.theta);
    // this.position.z = this.r * Math.sin(this.theta);

    const { lat, lng } = getLatLngObj(this.tle, +new Date);
    const [x, y, z] = calcPosFromLatLonRad(lat, lng, this.r);
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }
}
