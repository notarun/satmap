import { Group } from 'three';
import Earth from './components/earth';
import Satellite from './components/satellite';
import Startfield from './components/starfield';
import { ISatellite } from './services/satellites';

export default class SeedScene extends Group {
  private earth = new Earth();
  private starfield = new Startfield();
  private satellites: Array<Satellite> = [];

  constructor(satellitesData: ISatellite[]) {
    super();
    this.satellites.push(...satellitesData.map((d) => new Satellite(d)));
    this.add(this.earth, this.starfield, ...this.satellites);
  }

  update() {
    this.satellites.forEach((s) => s.update());
  }
}
