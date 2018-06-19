<template>
  <div >

  	<b-container class="header">
  		<b-row>
			<b-col><div class="course-name">{{round.course.name}}</div>
			<div class="course-location">{{round.course.city}}, {{round.course.state}}</div>
			</b-col>
		</b-row>

  		<b-row>
			<b-col><div class="date">{{roundDate}}</div></b-col>

			<b-col><div class="course-par">{{round.course.holes}} Holes - Par {{coursePar}}</div></b-col>
		</b-row>
  	</b-container>

  	<b-container class="chart">
  		<b-row v-for="(item, index) in players">
			<b-col cols="2" class="player-name">{{item.name}}</b-col>
			<b-col cols="10" class="grid">
				<chartLine :scores="item.scorecard" :totals="item.score"></chartLine>
			</b-col>
  		</b-row>

  		


  	</b-container>




  	<b-modal class="saveModal" v-model="saveModalShow" title="Save Round"  size="sm" ok-title="Save" @ok="saveRound">
  		<p>Verify the scorecard. After you save the round, you will no longer be able to edit it!</p>
		<b-alert variant="success" :show="saveSuccess">The round has been saved</b-alert>
		<b-alert variant="danger" :show="saveFailed">There was a problem saving the round!</b-alert>		
	</b-modal>


  </div>
</template>

<script>
import chartLine from '../components/chartLine'

export default {
	name: 'scorecard',
	components: {
		chartLine
	},
	data() {
		return {
			saveModalShow: false,
			saveSuccess: false,
			saveFailed: false
		}
	},
	computed: {
		round() {
			return this.$store.state.round
		},
		coursePar() {
			let total = 0;
			for(let i = 0; i < this.round.course.holes; i++) {
				total += this.$store.getters.holeData(i).par;
			}
			return total
		},
		players() {
			return this.$store.getters.players
		},
		roundDate() {
			return new Date(this.round.startTime).toLocaleString()
		}
	},
	methods: {
		saveRound() {
	  		this.$store.dispatch('saveRound');
	  		this.saveSuccess = true;
	  	}
	}
}
</script>

<style scoped>

.header {
	background-color: #E5E5E5;
	border-bottom: 2px solid #333;
	padding-bottom: 6px;
}

.header div {
	text-align: center;
}

.header .course-name {
	font-size: 18px;
	font-weight: 700;
}

.chart .row {
	padding-bottom: 8px;
}

.chart .player-name {
	border-bottom: #333 solid 1px;
	border-right: #333 solid 1px;
}

.chart .grid {
	padding-left: 0;
	padding-right: 0;
}


</style>