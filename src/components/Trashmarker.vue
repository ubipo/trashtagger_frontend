<template>
  <div>
    <h1>Trashmarker</h1>
    <p class="error">{{error}}</p>
    <div v-if="trashmarker !== null">
      <p>{{trashmarker.description}}</p>
      <p>Created on <span>{{trashmarker.created}}</span></p>
      <div v-if="trashtags && trashtags.length > 0">
        <h3>This marker was #trashtagged: </h3>
        <ul v-for="trashtag of trashtags" v-bind:key="trashtag.id">
          <li>"<router-link :to="`/trashtag/${trashtag.id}`">{{trashtag.description}}</router-link>" by <router-link :to="`/user/${trashtag.username}`">{{trashtag.username}}</router-link></li>
        </ul>
      </div>
      <h3 v-else>Nobody has #trashtagged this marker yet; this is <router-link to="/newtrashtag">your chance!</router-link></h3>
    </div>
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

delete Icon.Default.prototype._getIconUrl

export default {
  name: 'Trashmarker',
  components: { LMap, LTileLayer, LMarker },
  data () {
    return {
      trashmarker: null,
      trashtags: null,
      error: null,
      zoom: 13,
      center: L.latLng(50.90, 4.70),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  mounted () {
    let id = this.$route.params.id
    axios
      .get('https://hackthewaste.jellepelgrims.com/api/trashtag/')
      .then(res => {
        let trashtags = res.data
        axios
          .get(`https://hackthewaste.jellepelgrims.com/api/trashmarker/${id}`)
          .then(response => {
            this.trashmarker = response.data
            this.trashtags = trashtags.filter(trashtag => trashtag.trashmarker === this.trashmarker.id)
            L.marker([this.trashmarker.latitude, this.trashmarker.longitude]).addTo(this.$refs.myMap.mapObject)
          }, err => {
            console.error(err)
            this.error = err.message
          })
      }, err => {
        console.error(err)
      })
  }
}
</script>

<style scoped>
</style>
