<template>
  <div class="home">

    <h1>DG Score</h1>

    <div class="section" v-if="inProgress">
      <h4>Round in progress:</h4>
      <p>{{round.course.name}}</p>
      <p><b-button @click='resume'>Resume Round</b-button></p>

    </div>



    <div class="section" v-if="prevRounds.length">
      <h4>Previous Rounds:</h4>
      <b-list-group>
        <b-list-group-item v-for="(item, index) in prevRounds" :key="index">
          <b-container>
            <b-row>
              <b-col>{{item.course.name}}</b-col>
              <b-col>{{item.course.startTime | moment('MMM Do, YYYY')}}</b-col>
            </b-row>
          </b-container>
        </b-list-group-item>
      </b-list-group>


    </div>

    <div class="section">
      <p><b-button @click='newRound'>Start New Round</b-button></p>
    </div>

  </div>
</template>

<script>

export default {
  name: 'home',
  components: {

  },
  data() {
  	return {
      history: []
  	}
  },
  created() {
    if(! history.length) {
      this.getHistory()
    }
  },
  computed : {
  	user() {
  		return this.$store.state.user
  	},
  	round() {
  		return this.$store.state.round  
    },
    inProgress() {
      return this.round.started && ! this.round.finished;
    },
    prevRounds() {
      if(! history.length) {
        return []
      }
      return this.history.reverse().slice(0,5); // return last 5 rounds in order of most recent

    }
  	
  },
  methods: {

  	newRound() {
      // reset round
      this.$store.commit('resetRound');
  		this.$router.push('/new');
  	},
    getHistory() {
      if(window.localStorage && window.localStorage.dgScoreHistory) {
        try {
          this.history = JSON.parse(window.localStorage.getItem('dgScoreHistory'))
        } 
        catch (e) {
            console.log('Could not get history data from local storage')
        }
      }
    },
    resume() {
      this.$router.push('/round/' + (this.round.currentHole +1))
    }
  }

}




</script>

<style scoped>

.home, .section {
  text-align: center;
  padding: 16px 0;
  border-top: 1px solid #DDD;  
}



h1 {
  padding: 12px 0;
}

h3 {
	font-size: 18px;
	line-height: 20px;
}


</style>