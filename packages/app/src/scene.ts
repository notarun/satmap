import { Group } from 'three';
import Earth from './components/earth';
import Satellite from './components/satellite';
import Startfield from './components/starfield';

export default class SeedScene extends Group {
  constructor(
    private earth = new Earth(),
    private satellite = new Satellite(`ISS (ZARYA)
1 25544U 98067A   23055.76102899  .00017033  00000+0  31328-3 0  9990
2 25544  51.6390 165.4065 0005379  24.5892 135.6596 15.49298512384351`),
    private starfield = new Startfield(),
  ) {
    super();
    this.add(this.earth, this.satellite, this.starfield);
  }

  update() {
    this.satellite.update();
  }
}
