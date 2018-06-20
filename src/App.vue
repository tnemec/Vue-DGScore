<template>
  <div id="app">
    <transition name="slide">
      <router-view />
    </transition>
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
  max-width: 720px;
  margin: auto;
  position: relative;
  overflow-x: hidden;
  opacity: 1;
}

.slide-leave-active,
.slide-enter-active {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 720px;
  transition: .2s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
  opacity: 0;
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

.fixed {
  position: fixed;
  padding: 16px;
  width: 100%;
  max-width: 720px;
  bottom: 0px;
  border-top: 1px solid #AAA;
  overflow: hidden;
}



</style>
