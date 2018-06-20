import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	prefs: {
  		defaultPar: 3,
  		maxPlayers : 6,
		strokeLimit : 9,
  	},
    user : {
    	name: 'Tony', uid: 100, img: '', icon: ''
    },
    round : {
    	started: false,
    	finished: false,
    	startTime: '',
    	finishTime: '',
    	course: {},
    	startingHole: 0,
    	currentHole: 0,
    	players: [
    	],
    	holesPlayed: []

    },
    newround : {
    	course: {},
    	players: []
    },
    savedPlayers : [
		{name: 'Steve', uid: 101, img: '', icon: ''}, 
		{name: 'Andrew', uid: 102, img: '', icon: ''}, 
	]
  },
  getters: {
  	holeData: (state) => (i) => {
  		if(i == undefined) {
  			i = state.round.currentHole;
  		}
  		return {
  			num: (state.round.course.num && state.round.course.num[i]) || i +1,
  			dist: (state.round.course.dist && state.round.course.dist[i]) || '',
  			par: (state.round.course.par && state.round.course.par[i]) || state.prefs.defaultPar
  		}
  	},
  	players: (state, getters) => {
  		let players = [];
  		for(let i = 0; i < state.round.players.length; i++) {
  			let player = state.round.players[i];
  			player.score = getters.playerScore(i);
  			players.push(player)
  		}
  		return players;
  	},
  	playerScore: (state, getters) => (player) => {
		var card = state.round.players[player].scorecard;

		if(card) {
			var totalStrokes = 0;
			var midRoundStrokes = 0;
			var currentPar = 0;
			for(var i = 0; i < card.length; i++ ){
				if(card[i] && card[i].s != undefined && card[i].s != 0) {
					totalStrokes +=  card[i].s;
					currentPar +=  (card[i].s - getters.holeData(i).par);
					if(i < Math.floor(state.round.course.holes/2)) {
						// calculate the mid round total
						midRoundStrokes +=  card[i].s;
					}
				} 
			}
			currentPar = (currentPar > 0) ? '+' + currentPar: currentPar;
			currentPar = (currentPar == 0) ? 'E' : currentPar;
			return {'totalStrokes' : totalStrokes, 'currentPar' : currentPar, 'midRoundStrokes' : midRoundStrokes};
		}
		return {'totalStrokes' : '-', 'currentPar' : '-', 'midRoundStrokes' : 0};
	}
  },
  mutations: {
	initialiseStore(state) {
		// Check if the ID exists
		if(localStorage.getItem('store')) {
			this.replaceState(
				Object.assign(state, JSON.parse(window.localStorage.getItem('store')))
			);
		}
	},
	selectCourse(state, selectedCourse) {
		state.newround.course = selectedCourse;
	},
	selectPlayers(state, players) {
		state.newround.players = players;
	},
	insertSavedPlayer(state, player) {
		state.savedPlayers.push(player);
	},
	resetRound(state) {
		state.round = {
		started: false,
    	finished: false,
    	startTime: '',
    	finishTime: '',
    	course: {},
    	startingHole: 0,
    	currentHole: 0,
    	players: [],
    	holesPlayed: []}
	},
	startRound(state, startingHole) {
		state.round.course = state.newround.course;
		state.round.players = state.newround.players;
		state.newround.course = {};
		state.newround.players = [];
		state.round.finished = false;
		state.round.started = true;
		state.round.startTime = new Date();
		state.round.currentHole = startingHole;
		// reset scorecards
		for(let player of state.round.players) {
			let ar = new Array(state.round.course.holes);
			for(let i = 0; i < ar.length; i++) {
				ar[i] = {s:0}
			}
			player.scorecard = ar;
		}
	},
	viewHole(state, i) {
		if(Number.isNaN(i)) {
			state.round.currentHole = 0;
		} else {
			state.round.currentHole = Math.max(0, Math.min(i, state.round.course.holes))			
		}
	},
	setStrokes(state, payload) {
		console.log(payload)
		for(let p = 0; p < state.round.players.length; p++) {
			
			if(state.round.players[p].uid == payload.player) {
				let player = state.round.players[p];
				if(! player.scorecard) {
					player.scorecard = []
				}
				if(! player.scorecard[payload.hole]) {
					player.scorecard[payload.hole] = {s:0}
				}
				 player.scorecard[payload.hole].s = payload.strokes
				break;			
			}
		}

	},
	setDefaultStrokes(state, hole) {
		for(let player of state.round.players) {
			if(player.scorecard[hole].s == 0) {
				player.scorecard[hole].s = this.getters.holeData(hole).par;
			}
		}
		if(state.round.holesPlayed.indexOf(hole) == -1) {
			state.round.holesPlayed.push(hole)
		}
	},
	finishRound(state) {
		state.round.finished = true;
		state.round.finishTime = new Date();
	}
  },
  actions: {
  	saveRound(context) {
		console.log('Save Round');
		try {
			let history = JSON.parse(window.localStorage.getItem('dgScoreHistory'));

			if(! history || !history.length) {
				let history = [];
			}
			history.push(this.state.round);
			window.localStorage.setItem('dgScoreHistory',JSON.stringify(history));

		} 
		catch (e) {
			console.log('Error saving round to localStorage ' + e)
		}
		
	}
  }
})

