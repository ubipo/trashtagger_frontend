<template>
  <div>
    <h1>Raid</h1>
    <p class="error">{{error}}</p>
    <div v-if="raid !== null">
      <p>{{raid.description}}</p>
      <p>Planned for <span>{{raid.planned}}</span></p>
      <h3>Participants</h3>
      <ul>
        <li v-for="user of raid.users" v-bind:key="user">
          <router-link :to="`/user/${user}`">{{user}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'Raid',
  data () {
    return {
      raid: null,
      error: null
    }
  },
  mounted () {
    let id = this.$route.params.id
    axios
      .get(`https://hackthewaste.jellepelgrims.com/api/trashraid/${id}`)
      .then(response => {
        this.raid = response.data
        console.log(response.data)
      }, err => {
        console.error(err.message)
        this.error = err.message
      })
  }
}
</script>

<style scoped>
</style>
