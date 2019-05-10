<template>
  <div>
    <h1>New trashtag</h1>
    <form id="new-trashtag-form">
      <label for="image-upload">Picture</label>
      <input id="image-upload" type="file" accept="image/*">
      <label for="description">Description</label>
      <input id="description" type="text">
      <select id="user">
        <option v-for="user in users" v-bind:key="user.username">{{user.username}}</option>
      </select>
      <img id="img">
      <label for="trash-marker">Selected marker</label>
      <input id="trash-marker" type="text" readonly>
      <input type="submit" value="Create">
    </form>
    <p class="error">{{error}}</p>
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
  name: 'NewTrashtag',
  components: { LMap, LTileLayer, LMarker },
  data () {
    return {
      error: null,
      users: [],
      zoom: 13,
      center: L.latLng(50.90, 4.70),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  mounted () {
    let eImport = document.getElementById('image-upload')
    let myImage = document.getElementById('img')
    let imgDataUrl = null
    eImport.addEventListener('change', e => {
      let reader = new FileReader()
      reader.addEventListener('load', () => {
        if (reader.readyState !== 2) {
          return
        }

        if (reader.error) {
          throw new Error('Reading file')
        }
        
        imgDataUrl = reader.result
        myImage.src = imgDataUrl
      })
      reader.readAsDataURL(eImport.files[0])
    })

    let eTrashMarker = document.getElementById('trash-marker');
    axios
      .get('https://hackthewaste.jellepelgrims.com/api/trashmarker/')
      .then(res => {
        let trashmarkers = res.data
        for (let markerData of trashmarkers) {
          console.log(this.$refs.myMap.mapObject.getBounds())
          let marker = L.marker([markerData.latitude, markerData.longitude])
          marker.bindPopup(`
            <h3>${markerData.description}</h3>
            <a href=\"/trashmarker/${markerData.id}\">More about this trash marker...</a>
          `)
          marker.on('click', e => {
            eTrashMarker.value = markerData.description
            eTrashMarker.setAttribute('marker-id', markerData.id)
          })
          marker.addTo(this.$refs.myMap.mapObject)
        }
      }, err => {
        console.error(err)
        this.error = err.message
      })

    axios
      .get('https://hackthewaste.jellepelgrims.com/api/user/')
      .then(res => {
        console.log(res.data)
        this.users = res.data
      }, err => {
        console.error(err)
        this.error = err.message
      })

    let eForm = document.getElementById('new-trashtag-form').addEventListener('submit', e => {
      e.preventDefault()
      console.log(e)
      let description = e.target.elements['description'].value
      let user = e.target.elements['user'].value
      let trashMarker = e.target.elements['trash-marker'].getAttribute('marker-id')
      console.log([description, user, trashMarker])

      fetch('https://hackthewaste.jellepelgrims.com/api/trashtag/', {
        method: 'POST',
        body: JSON.stringify({
          username: user,
          description: description,
          trashmarker: trashMarker,
          picture: imgDataUrl.slice(22)
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res)
      })
    })
  }
}
</script>

<style scoped>
</style>
