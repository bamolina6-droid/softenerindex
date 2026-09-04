# softenerindex

A small full-stack web app that sizes a residential water softener and scores
water hardness on a 0–100 **Softener Index**.

## Features

- Convert hardness between grains/gallon and ppm (mg/L)
- Account for household size and dissolved iron
- Recommend a standard softener grain capacity and regeneration frequency
- Estimate salt usage per regeneration

## Tech stack

- Node.js (ESM) + [Express](https://expressjs.com/) for the API
- Static HTML/CSS/JS frontend (no build step)
- Tests via the built-in `node:test` runner

## Getting started

```bash
npm install
npm start
```

Then open http://localhost:3000.

Set `PORT` to change the port (defaults to `3000`).

## Development

```bash
npm run dev    # start with auto-reload (node --watch)
npm test       # run the unit test suite
```

## API

`POST /api/calculate`

```json
{
  "hardness": 12,
  "hardnessUnit": "gpg",
  "people": 4,
  "ironPpm": 0,
  "regenerationDays": 7
}
```

Returns sizing recommendations and the softener index. `GET /api/health`
returns `{ "status": "ok" }`.
