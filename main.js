import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';


//////////////////////////////////////////
// 1. Goal: Create a basic map
//////////////////////////////////////////

// Map is primary object in OpenLayers

// const map = new Map({   // constructs a new Map.
//   target: 'map', // points to a viewpoint ID in the DOM
//   view: new View({ // constructs a new View
//     center: fromLonLat([-93.41, 44.92]),
//     zoom: 9
//   }),
//   layers: [ // list of layers
//     new TileLayer({
//       source: new OSM() // basic OpenStreetMaps as a data source
//     })
//   ],
// });



//////////////////////////////////////////
// 2. Goal: Use a different Tile Source Layer
//////////////////////////////////////////

// import XYZ from 'ol/source/XYZ' // import new module. Tile data arranged by standard XYZ grid. Accessed through URLs

// const map = new Map({
//   target: 'map',
//   view: new View({
//     center: fromLonLat([-93.41, 44.92]),
//     zoom: 9,
//   }),
//   layers: [
//     new TileLayer({
//       source: new XYZ({ // new source module that fetches url
//         url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//         maxZoom: 19
//       })
//     }),
//   ],
// });



//////////////////////////////////////////
// 3. Goal: Add GeoJSON
//////////////////////////////////////////

// import VectorSource from 'ol/source/Vector';
// import { Vector as VectorLayer } from 'ol/layer';
// import { GeoJSON } from 'ol/format';

// const trails = new VectorLayer({ // Type of layer
//   source: new VectorSource({ // how to fetch it
//     url: '/trails.json', // path to data (Metro Council Trails)
//     format: new GeoJSON() // required for rendering since fetching data from URL
//   }),
// });

// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     }),
//     trails // New map layer
//   ],
//   view: new View({
//     center: fromLonLat([-93.41, 44.92]),
//     zoom: 9,
//   })
// });


//////////////////////////////////////////
// 4. Goal: Style GeoJSON
//////////////////////////////////////////

// import VectorSource from 'ol/source/Vector';
// import { Vector as VectorLayer } from 'ol/layer';
// import { GeoJSON } from 'ol/format';

// import { Stroke, Style } from 'ol/style';

// const trails = new VectorLayer({
//   source: new VectorSource({
//     url: '/trails.json',
//     format: new GeoJSON()
//   }),
//   style: new Style({ // new Style constructor
//     stroke: new Stroke({ // Line type, so need Stroke symbolizer
//       color: 'green',
//       width: 3,
//       // lineDash: [.3, 5]
//     })
//   }),
// });

// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     }),
//     trails
//   ],
//   view: new View({
//     center: fromLonLat([-93.41, 44.92]),
//     zoom: 9,
//   })
// });


//////////////////////////////////////////
// 4. Goal: Add Interaction
//////////////////////////////////////////

// // Interactions: things that have no visible representation (Drag, Click, Hover, Keyboard Interactions etc.) in the DOM
// // Controls: fixed elements that you can see and interact with on the map (Zoom, scale, overviews, etc)
// // Overlays: tied to a geographical coordinate. (popups)

// import VectorSource from 'ol/source/Vector';
// import { Vector as VectorLayer } from 'ol/layer';
// import { GeoJSON } from 'ol/format';
// import { Stroke, Style } from 'ol/style';

// import Overlay from 'ol/Overlay';

// // Elements that make up the pop-up
// const container = document.getElementById('popup');
// const content = document.getElementById('popup-content');

// // Create a new one to anchor it to the map
// const overlay = new Overlay({
//   element: container,
// });

// const trails = new VectorLayer({
//   source: new VectorSource({
//     url: '/trails.json',
//     format: new GeoJSON()
//   }),
//   style: new Style({
//     stroke: new Stroke({
//       color: 'green',
//       width: 5,
//     })
//   }),
// });

// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     }),
//     trails
//   ],
//   overlays: [overlay], // Adds overlay to map
//   view: new View({
//     center: fromLonLat([-93.41, 44.92]),
//     zoom: 9,
//   })
// });

// map.on('click', (event) => { // Create Click interaction with map
//   const trailheads = map.getFeaturesAtPixel(event.pixel);
//   const coordinate = event.coordinate;

//   if (trailheads.length) {
//     content.innerHTML = `<p>${trailheads[0].get('NAME')}</p>`
//     overlay.setPosition(coordinate)
//   }
// })











//////////////////////////////////////////
// EXTRA. Add an ArcGIS REST feature service
//////////////////////////////////////////

// ArcGIS feature service url with query
// 
// query: where 1 = 1 (all records returned)
//        format = geojson
// const trailsURL = 'https://arcgis.metc.state.mn.us/server/rest/services/GISLibrary/TrailsRegional/FeatureServer/0/query?where=1%3D1&f=geojson'

// // Set layer source
// const vectorSource = new VectorSource({

//   format: new GeoJSON(), // define type of format you are calling
//   loader: function (extent, resolution, projection, success, failure) {

//     var xhr = new XMLHttpRequest(); // create a new request
//     xhr.open('GET', trailsURL); // fetch trailsURL 

//     xhr.onload = function () {
//       if (xhr.status == 200) { // if request was successful, read the response
//         var features = vectorSource.getFormat().readFeatures(xhr.response, {
//           featureProjection: projection // get response and define projection
//         });
//         vectorSource.addFeatures(features);
//         success(features)
//       } else { // if request failed, stop fetching
//         vectorSource.removeLoadedExtent(extent);
//         failure();
//       }
//     }

//     xhr.send(); // send request
//   }
// });

// // Create new Layer with source and add style
// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     }),
//     vectorSource
//   ],
//   view: new View({
//     center: fromLonLat([-93.41, 44.92]),
//     zoom: 9,
//   })
// });