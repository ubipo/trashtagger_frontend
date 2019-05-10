<template>
  <div>
    <p class="error">{{error}}</p>
    <div v-if="user !== null">
      <h1><span>{{user.first_name}}</span> <span>{{user.last_name}}</span></h1>
      <p>Level <span>{{user.level}}</span></p>
      <p>Experience points: <span>{{user.experience}}</span></p>
    </div>
  </div>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'User',
  data () {
    return {
      user: null,
      error: null
    }
  },
  mounted () {
    let username = this.$route.params.username
    axios
      .get(`https://hackthewaste.jellepelgrims.com/api/user/${username}`)
      .then(response => {
        console.log(response.data)
        this.user = response.data
      }, err => {
        console.error(err)
        this.error = err.message
      })
  }
}
</script>

<style scoped>
</style>
