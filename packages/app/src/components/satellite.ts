import { getLatLngObj } from 'tle.js';
import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import { calcPosFromLatLonRad } from '../utils';
import { ISatellite } from '../services/satellites';

// https://mattloftus.github.io/2016/02/03/threejs-p2/
export default class Satellite extends Mesh {
  private tle: string;
  private r = 0.6;

  constructor(data: ISatellite) {
    const geometry = new SphereGeometry(0.01);
    const material = new MeshBasicMaterial({ color: 0xfdcf09 });
    super(geometry, material);
    this.tle = `${data.name}\n${data.tle_line1}\n${data.tle_line2}`;
  }

  update() {
    try {
      const { lat, lng } = getLatLngObj(this.tle, +new Date);
      const [x, y, z] = calcPosFromLatLonRad(lat, lng, this.r);
      this.position.x = x;
      this.position.y = y;
      this.position.z = z;
    } catch {
      // if fails do nothing
    }
  }
}
