import { Group } from 'three';
import Earth from './components/earth';
import Satellite from './components/satellite';
import Startfield from './components/starfield';

export default class SeedScene extends Group {
  constructor(
    private earth = new Earth(),
    private satellite = new Satellite(),
    private starfield = new Startfield(),
  ) {
    super();
    this.add(this.earth, this.satellite, this.starfield);
  }

  update() {
    this.satellite.update();
  }
}
