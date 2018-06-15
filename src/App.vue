<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  created() {
    // Subscribe to store updates
    this.$store.subscribe((mutation, state) => {
      // Store the state object as a JSON string
      window.localStorage.setItem('store', JSON.stringify(state));
    });
  }
}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
  background: #76828a;
}

#app {
  background: #FFF;
  font-family: HelveticaNeue, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  max-width: 640px;
  margin: auto;
}

.list-group {
  margin-bottom: 12px;
}


.clickable {
  cursor: pointer;
}

.list-group-item.clickable:hover {
  background-color: #bbced3;
}

.spacer { 
  margin: 8px auto;
 }
.spacerLg { 
  margin: 16px auto;
 }

</style>
