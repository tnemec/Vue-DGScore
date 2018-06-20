<template>
	<div class="score-chart">
		<div v-for="(item, index) in scores" :key="index" :class="{cur : highlight(index)}">
			<div><b :class="cls(item,index)">{{item.s | nonZero}}</b></div>
			<div class="total" v-if="index == midpoint && totals.midRoundStrokes"><b>{{totals.midRoundStrokes}}</b></div>
			<div class="total" v-if="index == holes -1"><b>{{totals.totalStrokes}}</b></div>
		</div>
		<div class="par-calc"><div><b>{{totals.currentPar}}</b></div></div>
	</div>
	
</template>

<script>
export default {
	name: 'chartLine',
	props: ['scores', 'totals'],
	computed: {
		holes() {
			return this.$store.state.round.course.holes;
		},
		midpoint() {
			return Math.floor(this.holes/2) - 1;
		},
		hole(num) {
			return this.$store.getters.holeData(num)
		},
		round() {
			return this.$store.state.round;
		}
	},
	methods: {
		cls(item,index) {
			let str = 's' + item.s + ' p' + this.hole.par;
			if(item.p) {
				str += ' pn'
			}

			return str
		},
		highlight(index) {
			return this.round.currentHole == index
		}
	},
	filters: {
		nonZero(value) {
			return (value != 0) ? value : '-';
		}
	}
}

</script>

<style scoped>

	.score-chart {
		/*border-top: 1px solid #656565;*/
		min-height: 27px;
	}

	.score-chart div > div {
		position: relative;
		float: left;
		width: 28px;
		height: 28px;
		padding: 2px;
		padding-top: 3px;
		border-right: 1px solid #656565;
		border-bottom: 1px solid #656565;
		text-align: center;
	}

	.score-chart .player {
		width: 100%;
		background-color: #CCC;
		font-weight: 700;
		font-size: 16px;
		padding: 3px 6px;
		text-align: left;
	}
	.score-chart .player > span {
		float: right;
		padding-right: 24px;
	}

	.player-card .score-chart .player {
		display: none;
	}

	.score-chart .dblbogey,
	.score-chart .p3.s5,
	.score-chart .p3.s6,
	.score-chart .p4.s6,
	.score-chart .s7,
	.score-chart .s8,
	.score-chart .s9 {
		border: 3px double #f00;
	    padding: 0 4px;
	}
	.score-chart .bogey,
	.score-chart .p3.s4,
	.score-chart .p4.s5,
	.score-chart .p5.s6  {
		border: 2px solid #555;
	    padding: 0 4px;
	}
	.score-chart .par,
	.score-chart .p3.s3,
	.score-chart .p4.s4,
	.score-chart .p5.s5  {

	}
	.score-chart .birdie,
	.score-chart .p3.s2,
	.score-chart .p4.s3,
	.score-chart .p5.s4  {
		border: 2px solid #555;
	    padding: 0 4px;	
		border-radius: 10px;
	}
	.score-chart .eagle,
	.score-chart .p4.s2,
	.score-chart .p5.s3  {
		border: 2px solid #ff7e00;
	    padding: 0 4px;	
		border-radius: 10px;
	}
	.score-chart .ace,
	.score-chart .s1  {
		background-color: #ffed6b;
		border: 2px solid #ff7e00;
	    padding: 0 4px;	
		border-radius: 10px;
	}

	.player-card .score-chart .cur > div{
		background-color: rgba(105,231,171,0.3);
	}

	.score-chart .total {
		background-color: #777 !important;
		color: #FFF;
	}

	.score-chart .pn::before {
		position: absolute;
		bottom: 0px;
		left: 0px;
		content: '';
		width: 0px;
		height: 0px;
		border-bottom:6px solid red;
		border-right: 6px solid transparent;
	}



	@media (max-width: 320px) { 

		.score-chart div:nth-child(9)::after {
			clear: both;
		}

	}


</style>