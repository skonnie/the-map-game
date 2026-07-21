#!/usr/bin/env node
// build_world_data.js - JC's Map Game data pipeline (v109)
//
// Builds the self-hosted world data bundle from Natural Earth 10m sources:
//   data/world_admin0.topo.json  - admin-0 countries + map units in ONE
//                                  TopoJSON topology (shared arcs), simplified
//                                  (keep ~35% of points by spherical area) and
//                                  quantized. ~0.8 MB gzipped vs ~9.3 MB for
//                                  the two source GeoJSONs.
//   data/world_capitals.json     - only the Admin-0 capital rows the game
//                                  actually reads, with only the properties it
//                                  reads. ~40 KB vs 4.8 MB.
//
// Usage:
//   npm install topojson-server topojson-simplify topojson-client
//   node tools/build_world_data.js [--src <dir-with-ne-geojson-files>]
//
// Without --src, the inputs are downloaded from the Natural Earth GitHub
// mirror (the same sources the game used to fetch at runtime).

const fs = require('fs');
const path = require('path');
const { topology } = require('topojson-server');
const { presimplify, simplify, quantile, sphericalTriangleArea } = require('topojson-simplify');
const { quantize } = require('topojson-client');

const SIMPLIFY_KEEP = 0.35;    // fraction of points retained (by spherical weight)
const QUANTIZE = 1e5;          // ~400 m grid at the equator - invisible at game zooms
const SOURCES = {
  countries: 'ne_10m_admin_0_countries.geojson',
  units: 'ne_10m_admin_0_map_units.geojson',
  places: 'ne_10m_populated_places_simple.geojson'
};
const REMOTE_BASE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/';

async function loadSource(name, srcDir) {
  const file = SOURCES[name];
  if (srcDir) {
    const p = path.join(srcDir, file);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
    throw new Error('missing ' + p);
  }
  const res = await fetch(REMOTE_BASE + file);
  if (!res.ok) throw new Error(file + ': HTTP ' + res.status);
  return await res.json();
}

// Only the properties indexCapitalPlaces() reads (both property-name cases).
const CAPITAL_PROPS = ['FEATURECLA', 'featurecla', 'ADM0CAP', 'adm0cap', 'NAME', 'name',
  'NAMEASCII', 'nameascii', 'ADM0NAME', 'adm0name', 'SOV0NAME', 'sov0name',
  'ADM0_A3', 'adm0_a3', 'SOV_A3', 'sov_a3', 'ISO_A2', 'iso_a2', 'ISO_A3', 'iso_a3'];

function buildCapitals(places) {
  const out = [];
  for (const f of places.features || []) {
    const p = f.properties || {};
    const fc = String(p.FEATURECLA != null ? p.FEATURECLA : p.featurecla || '');
    const adm0cap = Number(p.ADM0CAP != null ? p.ADM0CAP : p.adm0cap);
    if (!/Admin-0 capital/i.test(fc) && adm0cap !== 1) continue;
    if (!f.geometry || f.geometry.type !== 'Point') continue;
    const props = {};
    for (const k of CAPITAL_PROPS) if (p[k] !== undefined && p[k] !== null) props[k] = p[k];
    out.push({ type: 'Feature', properties: props, geometry: f.geometry });
  }
  return { type: 'FeatureCollection', features: out };
}

async function main() {
  const srcIdx = process.argv.indexOf('--src');
  const srcDir = srcIdx !== -1 ? process.argv[srcIdx + 1] : null;
  const outDir = path.join(__dirname, '..', 'data');
  fs.mkdirSync(outDir, { recursive: true });

  console.log('loading sources' + (srcDir ? ' from ' + srcDir : ' from Natural Earth GitHub'));
  const [countries, units, places] = await Promise.all([
    loadSource('countries', srcDir), loadSource('units', srcDir), loadSource('places', srcDir)
  ]);
  console.log('countries features:', countries.features.length, '| units features:', units.features.length);

  let topo = topology({ countries, units }, 1e6);
  const pre = presimplify(topo, sphericalTriangleArea);
  topo = quantize(simplify(pre, quantile(pre, SIMPLIFY_KEEP)), QUANTIZE);
  let arcPoints = 0; for (const a of topo.arcs) arcPoints += a.length;

  const topoPath = path.join(outDir, 'world_admin0.topo.json');
  fs.writeFileSync(topoPath, JSON.stringify(topo));
  console.log('world_admin0.topo.json:', (fs.statSync(topoPath).size / 1024 | 0) + ' KB,', arcPoints.toLocaleString(), 'arc points');

  const capitals = buildCapitals(places);
  const capPath = path.join(outDir, 'world_capitals.json');
  fs.writeFileSync(capPath, JSON.stringify(capitals));
  console.log('world_capitals.json:', (fs.statSync(capPath).size / 1024 | 0) + ' KB,', capitals.features.length, 'capitals');
}

main().catch(function(err) { console.error(err); process.exit(1); });
