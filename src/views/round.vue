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
			<b-col cols="2" class="align-right"><div @click.capturet="nextPage" v-if="hasNext"  class="nav"><icon name="angle-right" scale="3"  /></div></b-col>
		</b-row>
	</b-container>

	<playerCard v-for="(item, index) in players" :player="item" :par="holePar" :hole="$store.state.round.currentHole" :index="index" :key="index"></playerCard>

  </div>
</template>

<script>
import 'vue-awesome/icons/angle-left'
import 'vue-awesome/icons/angle-right'

import playerCard from '../components/playerCard'

export default {
  name: 'round',
  components: {
  	playerCard
  },
  created() {
  	if(this.$route.params.num != undefined) {
  		this.$store.commit('viewHole',this.$route.params.num -1)
  	}
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
  		this.$store.commit('viewHole',this.$store.state.round.currentHole -1)
  	},
  	nextPage() {
  		this.$store.commit('viewHole',this.$store.state.round.currentHole +1)
  	},  
  }
}
</script>

<style scoped>

.header {
	background: #dee8ee;
	padding-bottom: 8px;
	padding-top: 8px;
}

.header .nav {
	cursor: pointer;
	padding: 0 8px;
	max-width: 40px;
}

.align-right {
	text-align: right
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