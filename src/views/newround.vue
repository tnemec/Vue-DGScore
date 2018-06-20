<template>
  <div class="newRound">


  		<h2>New Round</h2>

  		<b-container>
  			<b-row class="section">
		  		<b-col cols="3"><strong>Players:</strong></b-col>
		  		<b-col cols="6"><p v-for="item in round.players" style="text-align: left">{{item.name}}</p></b-col>
		  		<b-col cols="3"><b-button @click="selectPlayer"  variant="link">{{addEditText}}</b-button></b-col>
		  	</b-row>

		  	<b-row class="section">

		  		<b-col cols="3"><strong>Course:</strong></b-col>
		  		<b-col cols="6"><p>{{round.course.name}}</p></b-col>
		  		<b-col cols="3"><b-button @click="selectCourse" variant="link">Select Course</b-button></b-col>

		  	</b-row>
		</b-container>


		<b-container>
  			<b-row class="section">

		  		<b-col><label for="startHole">Starting Hole:</label> <b-form-input id="startHole" type="number" v-model="startingHole" min="1" :max="round.course.holes" /></b-col>


		  	</b-row>
		  	<b-row>

		  		<b-col><b-button @click="cancel" variant="link">Cancel</b-button></b-col>


		  		<b-col>	<b-button @click="startNewRound"  variant="primary" :disabled="! readyToStart">Start Round</b-button></b-col>
		  	</b-row>
		 </b-container>







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
  		return this.$store.state.newround  		
  	},
  	addEditText() {
  		return (this.round.players.length) ? 'Edit Players' : 'Add Players'
  	},
  	readyToStart() {
  		return this.round.players.length != 0 && this.round.course;
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
  	},
  	cancel() {
  		this.$router.push('/');
  	}
  }

}




</script>

<style scoped>

.newRound {
	text-align: center;
	padding-top: 12px;
}

.newRound h2 {
	margin-bottom: 24px;
}

.newRound .section {
	padding: 16px 0;
	border-top: 1px solid #DDD;
}

#startHole {
	max-width: 60px;
	display: inline-block;
}


</style>