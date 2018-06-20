<template>
	<div>
		<h3>Select Course</h3>
		<b-list-group>
			<b-list-group-item v-for="(item, index) in savedCourses" @click="selectCourse(index)" class="clickable" :key="index">{{item.name}}</b-list-group-item>
		</b-list-group>

		<div class="fixed">
			<b-button size="lg" variant="link" @click="back">Back</b-button>
		</div>
	</div>	
</template>


<script>
import savedData from '../service/savedCourses.json'

export default {
	name: "selectCourse",
	data() {
		return {
			savedCourses : []
		}
	},
	created() {
		this.getCourses();
	},
	methods : {
		getCourses() {
			this.savedCourses = savedData.Items
		},
		selectCourse(index) {
			console.log(this.savedCourses[index])
			this.$store.commit('selectCourse',this.savedCourses[index]);
			this.back();
		},
		back() {
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

</style>