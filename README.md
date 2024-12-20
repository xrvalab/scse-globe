[![SCSE Globe Teaser](./public/github/scse-globe-teaser.png)](https://xrvalab.github.io/scse-globe)

---

# SCSE Globe

Interactive Data Globe for [Bangor University School of Computer Science and Engineering](https://www.bangor.ac.uk/scse)

Built with [Vite](https://vitejs.dev), [React](https://react.dev) and [TypeScript](https://typescriptlang.org)

## Contents

- [Globe Data](#globe-data)
- [API Keys](#api-keys)
- [Display Options](#display-options)
- [Credits](#credits)

## Globe Data

Globe profile data should be included in `src/datasets`, `public/avatars`, and `public/organisations`. File format TBC.

## API Keys

API keys are required for the following services:

- `VITE_AISSTREAM_API_KEY` - [aisstream.io](https://aisstream.io) - Ship tracking (for the Prince Madog and Breeze)

Add `.env.local` in the route of the project with the keys you wish to activate.

## URL Parameters for Display Options

- Append `?display=1` to disable multi-touch zoom, context menus, and cursors.
- Append `?theme=0|1` to specify initial theme. Light: `0`, Dark: `1`.
- Append `?hex=3|4` to specify globe hex resolution.
- Append `?notitle=1` to not render title screen.

### Usage Example

`http://localhost:3000?display=1&theme=1` will disable multi-touch zoom and load in dark mode

## Credits

Special thanks to our fantastic alumni for contributing content for the alumni database.

- Globe.GL ([source](https://globe.gl))
- Natural Earth Vector ([source](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson))
- FontFaceKit Roboto ([source](https://github.com/FontFaceKit/roboto/tree/woff))

Created by [Peter Butcher](https://pbutcher.uk)

[XRealtity, Visualization, and Analytics Lab](https://xrvalab.github.io)  
[School of Computer Science and Engineering](https://bangor.ac.uk/scse)  
[Bangor University](https://bangor.ac.uk)

---

[![An Open Source Project by XRVA](./public/github/github-footer.png)](https://github.com/xrvalab)
