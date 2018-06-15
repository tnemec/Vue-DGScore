<template>
  <div class="newRound">

  		<b-container>
  			<b-row>
		  		<b-col>
		  			<h3>Players:</h3>
		  			<p v-for="item in round.players">{{item.name}}</p>
		  			<b-button @click="selectPlayer" size="sm">{{addEditText}}</b-button>
		  		</b-col>


		  		<b-col>
		  			<h3>Course:</h3>
		  			<p>{{round.course.name}}</p>
		  			<b-button @click="selectCourse" size="sm">Select Course</b-button>
		  		</b-col>

		  	</b-row>
		</b-container>


		  	<div class="spacerLg"></div>


		  		<p><label for="startHole">Starting Hole:</label> <b-form-input id="startHole" type="number" v-model="startingHole" min="1" :max="round.course.holes" /></p>

		  		<p><b-button @click="startNewRound" size="sm">Start Round</b-button></p>






  </div>
</template>

<script>

export default {
  name: 'newRound',
  components: {

  },
  data() {
  	return {
  		startingHole: 1
  	}
  },
  computed : {
  	user() {
  		return this.$store.state.user
  	},
  	round() {
  		return this.$store.state.round  		
  	},
  	addEditText() {
  		return (this.round.players.length) ? 'Edit Players' : 'Add Players'
  	}
  },
  methods: {
   	selectPlayer() {
  		this.$router.push('/players');
  	}, 	
  	selectCourse() {
  		this.$router.push('/course');
  	},
  	startNewRound() {
  		this.$store.commit('startRound', this.startingHole -1);
  		this.$router.push('/round');
  	}
  }

}




</script>

<style>

.newRound h3 {
	font-size: 18px;
	line-height: 20px;
}

#startHole {
	max-width: 50px;
	display: inline-block;
}


</style>