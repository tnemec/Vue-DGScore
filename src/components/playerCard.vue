<template>
  <div class="player-card">
	<div class="label-bar">
		<div class="player-label">{{player.name}}</div>
		<div class="round-score-label">Current Score</div>
		<div class="round-score-value">{{score.totalStrokes}}</div>
		<div class="round-par-value">{{score.currentPar}}</div>
	</div>
	<div class="player-grid">
		<div class="player-picture"></div>
		<div class="strokes" :class="{ played : played }">
			<div class="strokes-label">Strokes</div>
			<div class="minus" @click.capture="subStroke">
				<icon name="minus-circle" scale="2" />
			</div>
			<div class="stroke-value" >{{currentStrokes}}</div>
			<div  class="plus" @click.capture="addStroke">
				<icon name="plus-circle" scale="2" />
			</div>
		</div>
	</div>
	<div class="extras-bar"></div>
	<chartLine :scores="player.scorecard" :totals="score"></chartLine>

	<b-modal ref="warning" size="sm" ok-title="Edit Score" @ok="unlock">
		This hole has been played. Do you want to edit the score?
	</b-modal>

  </div>
</template>

<script>
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/minus-circle'

import chartLine from './chartLine'

export default {
  name: 'playerCard',
  components: {
  chartLine
  },
  props: ['player','index', 'par', 'hole'],
  data() {
  	return {
  		unlockEdit: false
  	}
  },
  created() {
  },
  computed: {
  	currentStrokes() {
  		return Math.max(this.player.scorecard[this.hole].s || this.par, 0)
  	},
  	score() {
  		return this.$store.getters.playerScore(this.index);
  	},
  	played() {
  		return this.$store.state.round.holesPlayed.indexOf(this.hole) != -1 && ! this.unlockEdit; 
  	}
  },
  methods: {
  	addStroke() {
  		if(this.played && ! this.unlockEdit) {
  			this.$refs.warning.show();
  		} else {
	  		let payload = {
	  			player: this.player.uid,
	  			hole: this.hole,
	  			strokes: Math.min(this.currentStrokes + 1, this.$store.state.prefs.strokeLimit)
	  		}
	  		this.$store.commit('setStrokes', payload)  			
  		}

  	},
    subStroke() {
		if(this.played && ! this.unlockEdit) {
			this.$refs.warning.show();
		} else {
	  		let payload = {
	  			player: this.player.uid,
	  			hole: this.hole,
	  			strokes: Math.max(this.currentStrokes -1, 1)
	  		}
	  		this.$store.commit('setStrokes', payload)
	  	}
  	}, 
  	unlock() {
  		this.unlockEdit = true;
  	}
  }
}
</script>

<style scoped>

.player-picture{
	background-color: #DDDDDD;
	border-radius: 100%;
	margin: 6px 16px 8px  28px;
	float: left;
	background-repeat: no-repeat;
	background-position: 50% 50%;
	background-image: url('../assets/abstract-user.svg');
	background-size: 100%;
}

.player-card .label-bar {
	background-color: #184159;
	position: relative;
	text-shadow: none;
	color: #FFFFFF;
	font-size: 21px;
}

.player-card .label-bar .player-label {
	font-weight: 700;
	font-size: 20px;
	color: #FFFFFF;
	padding: 8px 16px;
	padding-left: 24px;
}
.player-card .label-bar .round-score-label {
	font-size: 10px;
	color: #adc5d3;
	text-align: right;
	text-transform: uppercase;
	position: absolute;
	top: 2px;
	right: 8px;
}

.player-card .label-bar .round-score-value {
	position: absolute;
	top: 14px;
	right: 64px;
}

.player-card .label-bar .round-par-value {
	position: absolute;
	top: 14px;
	right: 12px;
}

.player-card .player-grid {
	height: 72px;
	border-bottom: 1px solid #184159;
	box-shadow: 0px 4px 4px -1px rgba(0,0,0,0.40);
}
.player-card.played  {
	background: #d7ecf4; /* Old browsers */
	background: linear-gradient(to right, #d7ecf4 45%,#ffffff 100%);
}
.player-card .player-grid .player-picture{
	width: 56px;
	height: 56px;
}

.player-card .player-grid .strokes {
	text-align: right;
	margin-right: 32px;
	float: right;
	position: relative;
}

.player-card .player-grid .strokes * {
	position: absolute;
	top: 12px;
}
.player-card .player-grid .strokes .minus {
	right: 124px;
	width: 32px;
	cursor: pointer
}
.player-card .player-grid .strokes .plus {
	right: 16px;
	width: 32px;
	cursor: pointer
}

.player-card .player-grid .strokes.played .fa-icon {
	fill: #bfced6;
}

.player-card  .player-grid .strokes .strokes-label {
	font-size: 10px;
	color: #777777;
	text-align: center;
	text-transform: uppercase;
	right: 32px;
	top: 6px;
}

.player-card .player-grid .strokes .stroke-value {
	font-size: 42px;
	line-height: 20px;
	text-align: center;
	top: 30px;
    right: 20px;
    width: 70px;
}
</style>