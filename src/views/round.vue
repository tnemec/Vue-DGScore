<template>
  <div class="round">
	<b-container class="header">
		<b-row  align-h="between">
			<b-col cols="2"><div @click.capture="prevPage" v-if="hasPrev" class="nav"><icon name="angle-left" scale="3" /></div></b-col>
			<b-col cols="2"><span class="hole-num">{{round.currentHole +1}}</span></b-col>
			<b-col cols="6">
				<div class="course-name">{{round.course.name}}</div>
				<div class="hole-info">{{holeInfo}}</div>
			</b-col>
			<b-col cols="2" class="align-right">
				<div @click.capturet="nextPage" v-if="hasNext"  class="nav"><icon name="angle-right" scale="3"  /></div>
				<div @click.capturet="finish" v-if="round.currentHole +1 == round.course.holes"  class="nav"><icon name="check" scale="3"  />
				</div>
			</b-col>
		</b-row>
	</b-container>

	<playerCard v-for="(item, index) in players" :player="item" :par="holePar" :hole="round.currentHole" :index="index" :key="index"></playerCard>

	<b-modal class="finishModal" v-model="finishModalShow" title="Finish Round" ok-title="View Scorecard" size="sm" @ok="viewScorecard">
		<p>You can continue to edit after you finish the round.</p>
	</b-modal>

  </div>
</template>

<script>
import 'vue-awesome/icons/angle-left'
import 'vue-awesome/icons/angle-right'
import 'vue-awesome/icons/check'

import playerCard from '../components/playerCard'

export default {
  name: 'round',
  data() {
  	return {
  		finishModalShow: false,
  		saveSuccess: false,
  		saveFailed: false
  	}
  },
  components: {
  	playerCard
  },
  beforeRouteUpdate (to, from, next) {
  	if(this.$route.params.num != undefined) {
  		this.$store.commit('viewHole',this.$route.params.num -1)
  	}
  	next()
  },
  computed: {
	round() {
		return this.$store.state.round
	},
	players() {
		return this.$store.getters.players
	},
	holePar() {
		return this.$store.getters.holeData().par
	},
	holeInfo() {
		let data = this.$store.getters.holeData();
		let par = 'Par ' + data.par + ' - ';
		let dist = data.dist + ' ft.';
		return  par + dist
	},
	hasPrev() {
		return this.$store.state.round.currentHole -1 >= 0;
	},
	hasNext() {
		return this.$store.state.round.currentHole + 1 < this.$store.state.round.course.holes
	}
  },
  methods: {
  	prevPage() {
  		this.$store.commit('setDefaultStrokes',this.round.currentHole)
  		this.$store.commit('viewHole',this.round.currentHole -1)
  		this.$router.push('/round/' + (this.round.currentHole + 1));
  	},
  	nextPage() {
  		this.$store.commit('setDefaultStrokes',this.round.currentHole)
  		this.$store.commit('viewHole',this.$store.state.round.currentHole +1)
  		this.$router.push('/round/' + (this.round.currentHole + 1));
  	}, 
  	finish() {
  		this.$store.commit('setDefaultStrokes',this.round.currentHole);
  		this.finishModalShow = true;
  	},
  	viewScorecard() {
  		this.$store.commit('finishRound');
  		this.$router.push('/scorecard')
  	}
  }
}
</script>

<style >

.header {
	background: #dee8ee;
	padding-bottom: 8px;
	padding-top: 8px;
}

.header .nav {
	position: absolute;
	cursor: pointer;
	padding: 0 8px;
	max-width: 40px;
}

.align-right .nav {
	right: 8px;
}

.header .hole-num {
	display: inline-block;
	font-size: 40px;
	line-height: 44px;
	font-weight: 700;
	text-align: center;
	border: 3px solid #999;
	border-radius: 6px;
	padding: 0 6px;
	padding-bottom: 2px;
	min-width: 44px;
	background: #FFF;
}

.header .hole-info {
	font-size: 22px;
}



</style>