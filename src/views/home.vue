<template>
  <div class="home">

    <h1>DG Score</h1>

    <p><b-button @click='newRound'>Start New Round</b-button></p>

  </div>
</template>

<script>

export default {
  name: 'home',
  components: {

  },
  data() {
  	return {

  	}
  },
  computed : {
  	user() {
  		return this.$store.state.user
  	},
  	round() {
  		return this.$store.state.round  		
  	}
  },
  methods: {

  	newRound() {
      // reset round
      this.$store.commit('resetRound');
  		this.$router.push('/new');
  	}
  }

}




</script>

<style>

.home h3 {
	font-size: 18px;
	line-height: 20px;
}


</style>