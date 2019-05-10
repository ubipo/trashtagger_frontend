<template>
  <div>
    <h1>Trashtag</h1>
    <p class="error">{{error}}</p>
    <div v-if="trashtag !== null">
      <p>{{trashtag.description}}</p>
      <p>Created on <span>{{trashtag.created}}</span> by <router-link :to="`/user/${trashtag.username}`">{{trashtag.username}}</router-link></p>
      <p>{{trashtag.user}}</p>
      <img :src="`https://hackthewaste.jellepelgrims.com${trashtag.image}`">
    </div>
  </div>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'Trashtag',
  data () {
    return {
      trashtag: null,
      error: null
    }
  },
mounted () {
    let id = this.$route.params.id
    axios
      .get(`https://hackthewaste.jellepelgrims.com/api/trashtag/${id}`)
      .then(response => {
        this.trashtag = response.data
      }, err => {
        console.error(err)
        this.error = err.message
      })
  }
}
</script>

<style scoped>
</style>
