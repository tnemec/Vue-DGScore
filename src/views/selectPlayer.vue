<template>
	<div>
		<h3>Select Players</h3>
		<b-list-group>
			<b-list-group-item v-for="(item, index) in savedPlayers" @click="selectPlayer(index)" class="clickable" :key="index" :active="isSelected(item)"><icon name="check" v-if="isSelected(item)" /> {{item.name}}</b-list-group-item>
		</b-list-group>

		<b-row>
			<b-col><b-button size="lg" variant="link" @click="back">Back</b-button></b-col>
			<b-col style="text-align:right"><b-button size="lg" variant="primary" @click="done">Done</b-button></b-col>
		</b-row>

	</div>	
</template>


<script>
import 'vue-awesome/icons/check'

export default {
	name: "selectPlayer",
	data() {
		return {
			tempPlayers : this.$store.state.round.players
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

<style>

</style>