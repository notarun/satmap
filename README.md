# satmap

> The 3D Satellite Map

![stamap screen](https://github.com/notarun/satmap/blob/master/.github/screen.jpg?raw=true)

### Prerequisite

- `node 16`
- `npm 9`
- `sqlite 3`

### Setup

```bash
git clone https://github.com/notarun/satmap
cd satmap
npm install

# create database and seed the inital data
npm run db:init

# start development servers
npm run dev -w app    # frontend
npm run dev -w cli    # command line
npm run dev -w server # api server

# create production build
npm run build -ws

# production server
npm run start -w server

# fetch and seed latest TLE data
npm run start -w cli seed
```

### Links
- [TLE Format](https://celestrak.org/NORAD/documentation/tle-fmt.php)
- [Current Satellites Data](https://celestrak.org/NORAD/elements/)
- [SGP4 javscript implementation](https://github.com/shashwatak/satellite-js)
- [DLR Space Debris Viewer](https://www.dlr.de/sc/en/desktopdefault.aspx/tabid-12766/22301_read-51854/)
