<template>
  <div>
    <h1>Trashtags</h1>
    <p class="error">{{error}}</p>
    <table v-if="trashtags !== null">
      <thead> 
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Location</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody v-for="trashtag in trashtags" v-bind:key="trashtag.id">
        <tr>
          <td>{{trashtag.created}}</td>
          <td>{{trashtag.username}}</td>
          <td><button class="btnLocation" onclick="myFunction()"> Location</button></td>
          <td><router-link :to="`/trashtag/${trashtag.id}`"> more...</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'Trashtags',
  data () {
    return {
      trashtags: null,
      error: null
    }
  },
  mounted () {
    axios
      .get(`https://hackthewaste.jellepelgrims.com/api/trashtag`)
      .then(response => {
        this.trashtags = response.data
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
