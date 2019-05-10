<template>
  <div class="raids">
    <h1>Raids</h1>
    <p class="error">{{error}}</p>
    <table v-if="raids !== null">
      <thead> 
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody v-for="raid in raids" v-bind:key="raid.date">
        <tr>
          <td>{{raid.name}}</td>
          <td>{{raid.description}}</td>
          <!-- <td><button class="btnLocation" v-on:click="showOnMap(raid)"> Location</button></td> -->
          <td><router-link :to="`/raid/${raid.id}`">more...</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'Raids',
  data () {
    return {
      raids: null,
      error: null
    }
  },
  mounted () {
    let id = this.$route.params.id
    axios
      .get(`https://hackthewaste.jellepelgrims.com/api/trashraid`)
      .then(response => {
        this.raids = response.data
        console.log(response.data)
      }, err => {
        console.error(err.message)
        this.error = err.message
      })
  },
  methods: {
    showOnMap: function (event) {
      console.log(event)
    }
  }
}
</script>

<style scoped>
.raids {
  padding: 3rem;
}

</style>
