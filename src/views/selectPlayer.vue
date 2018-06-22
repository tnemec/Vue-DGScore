<template>
	<div>

	<b-container>
		<b-row>
			<b-col cols="2"></b-col>
			<b-col><h3>Select Players</h3></b-col>
			<b-col cols="2" style="text-align:right"><div class="addPlayer" @click.capture="openModal"><icon name="user-plus" scale="2" /></div></b-col>
		</b-row>
	</b-container>

	<b-list-group class="playerList">
		<b-list-group-item v-for="(item, index) in savedPlayers" @click="selectPlayer(index)" class="clickable" :key="index" :active="isSelected(item)"><icon name="check" v-if="isSelected(item)" /> {{item.name}}
		<span class="editIcon" @click="editPlayer(index)"><icon name="edit" /></span>
		</b-list-group-item>
	</b-list-group>

	<b-container class="fixed">
		<b-row>
			<b-col><b-button size="lg" variant="link" @click="back">Back</b-button></b-col>
			<b-col style="text-align:right"><b-button size="lg" variant="primary" @click="done">Done</b-button></b-col>
		</b-row>
	</b-container>

	<b-modal ref="newPlayerModal" title="New Player" @ok="addPlayer" ok-title="Add">
		<b-form>
			<b-form-group label="Name" label-for="playerName">
				<b-form-input id="playerName" v-model="newPlayerData.name"/>
			</b-form-group>
			<b-form-group label="PDGA Number" label-for="pdga">
				<b-form-input id="pdga" v-model="newPlayerData.pdga"/>
			</b-form-group>			
		</b-form>
	</b-modal>

	<b-modal ref="editPlayerModal" title="Edit Player" ok-title="Save">
		<b-form>
			<b-form-group label="Name" label-for="playerName">
				<b-form-input id="playerName" v-model="savedPlayers[editPlayerIndex].name"/>
			</b-form-group>
			<b-form-group label="PDGA Number" label-for="pdga">
				<b-form-input id="pdga" v-model="savedPlayers[editPlayerIndex].pdga"/>
			</b-form-group>	
			<p @click="removePlayer" class="removePlayer"><icon name="trash" /> Remove Player</p>
		</b-form>
	</b-modal>	

	</div>	
</template>


<script>
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/user-plus'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/trash'

export default {
	name: "selectPlayer",
	data() {
		return {
			tempPlayers : this.$store.state.newround.players || [],
			newPlayerData: {name: '', pdga: ''},
			editPlayerIndex: 0,
		}
	},
	created() {
	},
	computed: {
		round() {
			return this.$store.state.round
		},
		savedPlayers() {
			return this.$store.state.savedPlayers
		}

	},
	methods : {
		isSelected(item) {
			for(let i of this.tempPlayers) {
				if(item.uid == i.uid) {
					return true
				}
			}
			return false;
		},
		selectPlayer(index) {
			if(! this.isSelected(this.savedPlayers[index])) {
				this.tempPlayers.push(this.savedPlayers[index])				
			} else {
				for(let i = 0; i < this.tempPlayers.length; i++) {
					if(this.savedPlayers[index].uid == this.tempPlayers[i].uid) {
						this.tempPlayers.splice(i,1)
					}
				}
			}

		},
		editPlayer(index) {
			this.editPlayerIndex = index;
			this.$refs.editPlayerModal.show();
		},
		openModal() {
			this.$refs.newPlayerModal.show();
		},
		addPlayer() {
			let player = {
				name: this.newPlayerName,
				uid : Date.now(),
			}
			this.$store.commit('insertSavedPlayer',player);
			this.newPlayerName = '';
			this.$nextTick(function () {
				console.log('select')
			  	this.selectPlayer(0);
			})

		},
		removePlayer() {
			let index = this.editPlayerIndex;
			if(this.savedPlayers[index]) {
				for(let i = 0; i < this.tempPlayers.length; i++) {
					if(this.savedPlayers[index].uid == this.tempPlayers[i].uid) {
						this.tempPlayers.splice(i,1)
					}
				}
				this.$store.commit('removeSavedPlayer',index);
				this.$refs.editPlayerModal.hide();	
			}

		},
		back() {
			this.$router.push('/')
		},
		done() {
			this.$store.commit('selectPlayers',this.tempPlayers);			
			this.$router.push('/new')
		}
	}
}


</script>

<style scoped>

h3 {
	padding: 16px 0;
	text-align: center;
}

.addPlayer  {
	padding: 16px 16px 4px 6px;
	cursor: pointer;
}

.editIcon {
	position: absolute;
	right: 0;
	top: 0;
	padding: 16px 16px 4px 6px;
	cursor: pointer;	
}
.removePlayer  {
	color: red;
	cursor: pointer;
}

</style>