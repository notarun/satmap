import { Group } from 'three';
import Cube from './cube';

export default class SeedScene extends Group {
  private cube: Cube;

  constructor() {
    super();
    this.cube = new Cube();
    this.add(this.cube);
  }

  update() {
    this.cube.update();
  }
}
