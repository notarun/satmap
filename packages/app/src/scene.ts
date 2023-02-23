import { Group } from 'three';
import Earth from './components/earth';

export default class SeedScene extends Group {
  constructor(
    private earth = new Earth(),
  ) {
    super();
    this.add(this.earth);
  }

  update() {
    this.earth.update();
  }
}
