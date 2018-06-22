<template>
  <div class="home">

    <h1>DG Score</h1>

    <p class="about">An app to keep track of your Disc Golf scores. Developed with VueJS.</p>

    <p class="about">Your rounds will be stored locally on your device.</p>

    <div class="section" v-if="inProgress">
      <h4>Round in progress:</h4>
      <p>{{round.course.name}}</p>
      <p><b-button @click='resume'>Resume Round</b-button></p>

    </div>


    <div class="section">
      <p><b-button @click='newRound'>Start New Round</b-button></p>
    </div>

    <div class="section" v-if="prevRounds.length && !inProgress">
      <h4>Previous Rounds:</h4>
        <div v-for="(item, index) in prevRounds" :key="index" v-if="item.finished">
          <b-container>
            <b-row @click="viewScorecard(item)" class="prevRound">
              <b-col>{{item.course.name}}</b-col>
              <b-col>{{item.startTime | moment("MMM Do, YYYY")}}</b-col>
              <b-col><icon name="th-list" /></b-col>
            </b-row>
          </b-container>
        </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/th-list'

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
    },
    inProgress() {
      return this.round.started && ! this.round.finished;
    },
    prevRounds() {
      if(! this.getHistory.length) {
        return []
      }
      return this.getHistory.reverse().slice(0,5); // return last 5 rounds in order of most recent

    },
  	getHistory() {
      if(window.localStorage && window.localStorage.dgScoreHistory) {
        try {
          console.log('Get History')
          return JSON.parse(window.localStorage.getItem('dgScoreHistory'))
        } 
        catch (e) {
            console.log('Could not get history data from local storage')
        }
      }
      return []
    }
  },
  methods: {

  	newRound() {
      // reset round
      this.$store.commit('resetRound');
  		this.$router.push('/new');
  	},
    viewScorecard(savedRound) {
      this.$store.commit('replaceRound', savedRound);
      this.$nextTick(function() {
        this.$router.push('/scorecard');
      })
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

.about {
  color: #777;
  font-style: italic
}

h1 {
  padding: 12px 0;
}

h3 {
	font-size: 18px;
	line-height: 20px;
}

.prevRound {
  cursor: pointer
}
.prevRound:hover {
  background-color: #a6cdea
}

</style>