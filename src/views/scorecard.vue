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

  	<b-container class="legend">
	  	<b-row>
		  	<b-col cols="2">Hole</b-col>
		  	<b-col cols="10" class="grid">
				<div v-for="(item, index) in courseData" :key="index">
					<div>{{item.num}}</div>
					<div v-if="index == courseMidPoint"></div>
					<div  v-if="index == courseData.length -1"></div>
				</div>
			</b-col>	
			<b-col cols="2"></b-col>
		</b-row>
	  	<b-row>
		  	<b-col cols="2">Par</b-col>
		  	<b-col cols="10" class="grid">
				<div v-for="(item, index) in courseData" :key="index">
					<div>{{item.par}}</div>
					<div v-if="index == courseMidPoint">{{courseMidPar}}</div>
					<div  v-if="index == courseData.length -1">{{coursePar}}</div>
				</div>
			</b-col>	
			<b-col cols="2"></b-col>
		</b-row>

  	</b-container>

  	<b-container class="chart">
  		<b-row v-for="(item, index) in players" :key="index">
			<b-col cols="2" class="player-name">{{item.name}}</b-col>
			<b-col cols="10" class="grid">
				<chartLine :scores="item.scorecard" :totals="item.score"></chartLine>
			</b-col>
  		</b-row>
  	</b-container>


	<b-container class="fixed">
		<b-row>
			<b-col><b-button to="/" variant="link">Home</b-button></b-col>
			<b-col style="text-align:center"><b-button @click="resume"  variant="link"  v-if="!round.finished">Return</b-button></b-col>
			<b-col style="text-align:right"><b-button v-b-modal="'save'" v-if="!round.finished" variant="link">Save Round</b-button></b-col>
		</b-row>
	</b-container>




  	<b-modal ref="save" id="save" class="saveModal" v-model="saveModalShow" title="Save Round"  size="sm" :ok-title="saveTitle" @ok="saveRound">
  		<p v-if="saveTitle == 'Abandon'"><strong>This round is unfinished!</strong><br> If abandon the round, you will have to start a new round.</p>
  		<p v-else>Verify the scorecard. After you save the round, you will no longer be able to edit it!</p>
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
			saveFailed: false,
			courseData: [],
			courseMidPoint: 0,
			courseMidPar : 0,
			coursePar: 0
		}
	},
	mounted() {
		let total = 0;
		let list = [];
		this.courseMidPoint = (this.holes > 9) ? Math.floor(this.round.course.holes/2) - 1 : -1;
		for(let i = 0; i < this.round.course.holes; i++) {
			total += this.$store.getters.holeData(i).par;
			if(i == this.courseMidPoint) {
				this.courseMidPar = total;
			};
			list.push(this.$store.getters.holeData(i))
		}
		this.coursePar = total;
		this.courseData = list;
	},
	computed: {
		round() {
			return this.$store.state.round
		},
		players() {
			return this.$store.getters.players
		},
		roundDate() {
			return new Date(this.round.startTime).toLocaleString()
		},
		saveTitle() {
			if (this.round.finished) {
				return 'OK'
			}
			return (this.round.holesPlayed.length == this.round.course.holes) ? 'Save' : 'Abandon'
		}
	},
	methods: {
		saveRound(bvEvt) {
			if(this.saveSuccess) {
				this.$refs.save.hide();
				return 
			}
			bvEvt.preventDefault();
	  		this.$store.dispatch('saveRound').then( () => {
	  			this.saveSuccess = true;
	  		}, error => {
	  			this.saveSuccess = false;	  			
	  		});
	  	},
	  	resume() {
	      this.$router.push('/round/' + (this.round.currentHole +1))
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

}

.chart .player-name {
	border-bottom: #333 solid 1px;
	border-right: #333 solid 1px;
}



.chart .row:first-child {
	border-top: #333 solid 2px;
}

.chart .grid {
	padding-left: 0;
	padding-right: 0;
	
}

.legend .row .col-2:first-child {
	border-right: #333 solid 1px;	
}
.legend .row:last-child {
	border-top: #333 solid 1px;
}

.legend .grid {
	/*border-top: 1px solid #656565;*/
	min-height: 27px;
	padding: 0;
}

.legend .grid div > div {
	position: relative;
	float: left;
	width: 28px;
	height: 28px;
	padding: 2px;
	border-right: 1px solid #656565;
	text-align: center;
}



</style>