<template>
  <div class="home">
    <l-map :zoom="zoom" :center="center" class="map" ref="myMap">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as axios from 'axios'

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})


function downloadFromOsm(bounds) {
  return new Promise((resolve, reject) => {
    let qDoc = document.implementation.createDocument(null, "osm-script")
    let qRoot = qDoc.documentElement;
    qRoot.setAttribute("output", "json");
    qRoot.setAttribute("timeout", "25")
    let eUnion = qDoc.createElement("union");
    eUnion.setAttribute("into", "_");
    for (let amenValue of ["waste_basket", "recycling", "waste_disposal"]) {
      for (let osmType of ["node", "way", "relation"]) {
        let eQuery = qDoc.createElement("query");
        eQuery.setAttribute("into", "_");
        eQuery.setAttribute("type", osmType);
        let eHasKv = qDoc.createElement("has-kv");
        eHasKv.setAttribute("k", "amenity");
        eHasKv.setAttribute("v", amenValue);
        let eBbox = qDoc.createElement("bbox-query");
        eBbox.setAttribute("s", bounds.getSouth())
        eBbox.setAttribute("w", bounds.getWest())
        eBbox.setAttribute("n", bounds.getNorth())
        eBbox.setAttribute("e", bounds.getEast())
        eQuery.append(eHasKv);
        eQuery.append(eBbox);
        eUnion.append(eQuery);
      }
    }

    let ePrint = qDoc.createElement("print");
    ePrint.setAttribute("from", "_");
    ePrint.setAttribute("geometry", "center");
    ePrint.setAttribute("ids", "yes");
    ePrint.setAttribute("mode", "body");

    qRoot.append(eUnion);
    qRoot.append(ePrint);

    let serializer = new XMLSerializer();
    let xmlString = serializer.serializeToString(qDoc);

    const request = new Request('https://overpass-api.de/api/interpreter', {method: 'POST', body: xmlString});
    fetch(request)
    .then(res => {
      return res.json();
    })
    .then(json => {
      resolve(json);
    });
  });

//   <osm-script output="json" output-config="" timeout="25">
//   <union into="_">
//   <print e="" from="_" geometry="center" ids="yes" limit="" mode="body" n="" order="id" s="" w=""/>
// </osm-script>

};

export default {
  name: 'Home',
  components: { LMap, LTileLayer, LMarker },
  data: () => {
    return {
      zoom: 13,
      center: L.latLng(50.90, 4.70),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  mounted () {
    axios
      .get('https://hackthewaste.jellepelgrims.com/api/trashtag/')
      .then(res => {
        let trashtags = res.data
        axios
          .get('https://hackthewaste.jellepelgrims.com/api/trashmarker/')
          .then(res => {
            let trashmarkers = res.data
            for (let markerData of trashmarkers) {
              console.log(this.$refs.myMap.mapObject.getBounds())
              let marker = L.marker([markerData.latitude, markerData.longitude])
              let relevantTrashtags = trashtags.filter(trashtag => trashtag.trashmarker === markerData.id)
              marker.bindPopup(`
                <a href=\"/trashmarker/${markerData.id}\">More about this trash marker...</a>
                ${relevantTrashtags.length > 0 ? `
                <h3>Users who cleaned up here: </h3>
                <ul>
                  <li>
                    ${
                      relevantTrashtags.map(tt => tt.username).join("</li><li>")
                    }
                  </li>
                </li>
                ` : ''}
              `)
              marker.addTo(this.$refs.myMap.mapObject)
            }
          }, err => {
            console.error(err)
          })
      }, err => {
        console.error(err)
      })

    document.getElementById("btn").addEventListener('click', e => {
      let bounds = this.$refs.myMap.mapObject.getBounds()
      downloadFromOsm(bounds).then(res => {
        for (let element of res.elements) {
          L.marker([element.lat, element.lon]).addTo(this.$refs.myMap.mapObject)
        }
      });
    });
  }
}
</script>

<style>
.home {
  height: 100%;
  margin: 0;
}

.map-cont {
  height: 100%;
  width: 100%;
}

.btn { 
  width: 15px;
  height: 15px;
  background-color: red;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 50000;
}
</style>
