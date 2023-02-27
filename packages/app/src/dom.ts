import { ISatellite } from './services/satellites';
import { getLatLngObj } from 'tle.js';

const searchSuggestionEl = document.querySelector('.search-suggestions')! as HTMLDivElement;
const satInfoEl = document.querySelector('.sat-info')! as HTMLDivElement;
const searchFormEl = document.querySelector('.search-form')! as HTMLFormElement;

export function renderSuggestions(suggestions?: Array<{ index: number, name: string }>) {
  renderSatInfo();
  if (!suggestions?.length) {
    searchSuggestionEl.style.display = 'none';
    return;
  }
  searchSuggestionEl.style.display = 'block';
  searchSuggestionEl.innerHTML = `
    <ol>${suggestions.map(({ index, name }) => `<li data-index="${index}">${name}</li>`).join('')}</ol>
  `;
  const listEl = document.querySelector('ol')!;
  listEl.addEventListener('click', (e) => {
    // @ts-ignore
    renderSatInfo(window.satellitesData[+e.target.dataset.index]);
    searchSuggestionEl.style.display = 'none';
  }, { once: true });
}

export function renderSatInfo(info?: ISatellite) {
  if (!info) {
    satInfoEl.style.display = 'none';
    return;
  }
  const now = +(new Date);
  const tle = `${info.name}\n${info.tle_line1}\n${info.tle_line2}`;
  const { lat, lng } = getLatLngObj(tle, now + (15 * 60));
  satInfoEl.style.display = 'block';
  satInfoEl.innerHTML = `
    Name: ${info.name}<br>
    Catalog Id: ${info.catalog_id}<br>
    Orbit Type: ${info.orbit_type}<br>
    Launch Date: ${info.launch_date}<br>
    Source: ${info.source_code} (${info.source_description})<br>
    Future coordinates (15 min): ${lat} ${lng}
  `;
}

let virtualLookupList: {index: number; str: string; name: string}[] = []
export function setupSearch(satellitesData: ISatellite[]) {
  satellitesData.forEach(({ catalog_id, name, source_code, source_description }, index) => {
    virtualLookupList.push({
      index,
      name,
      str: `${catalog_id} ${name} ${source_code} ${source_description}`.toLocaleLowerCase(),
    });
  });

  searchFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    let results = virtualLookupList;
    const query = (new FormData(searchFormEl)).get('query')?.toString().toLocaleLowerCase();
    if (query) {
      results = virtualLookupList.filter(({ str }) => str.includes(query));
    };
    renderSuggestions(results);
  });
}
