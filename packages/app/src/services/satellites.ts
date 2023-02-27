import config from '../config';

export interface ISatellite {
  id: number;
  catalog_id: number;
  name: string;
  launch_date: string;
  orbit_type: string;
  source_code: string;
  source_description: string;
  tle_line1: string;
  tle_line2: string;
};

export async function getAllSatellites(): Promise<ISatellite[]> {
  return (await fetch(`${config.apiEndpoint}/satellites`)).json();
}
