import { Group } from 'three';
import Earth from './components/earth';
import Startfield from './components/starfield';

export default class SeedScene extends Group {
  constructor(
    private earth = new Earth(),
    private starfield = new Startfield(),
  ) {
    super();
    this.add(this.earth, this.starfield);
  }

  update() {}
}
