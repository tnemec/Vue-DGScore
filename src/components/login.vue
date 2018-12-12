<template>
  <div class="login">


    <p class="about">Create an account to save your rounds to the cloud.</p>


    <div class="section">
      <h2>Login</h2>
      <b-form :name="loginform" @submit.prevent="handleSubmit">


              <b-form-group label="Email" label-for="email">
                <b-form-input id="email" v-model="login.email"/>
              </b-form-group> 
              <b-form-group label="Password" label-for="pwd">
                <b-form-input id="pwd" :type="password" v-model="login.pwd"/>
              </b-form-group>  


              <div class="button-grp">
                  <b-button @click="cancel">Cancel</b-button>               
                  <b-button :variant="primary" :type="submit">Log In</b-button>
              </div>

              
      </b-form>

    </div>



  </div>
</template>

<script>



export default {
  name: 'login',
  components: {

  },
  data() {
  	return {
      login : {
        email: '',
        pwd: '',
      }
  	}
  },
  computed : {

  },
  methods: {
    cancel() {
      
    },
    handleSubmit() {

    },
    updateUser(user) {

    },
    showErr(field, err) {

    }
  }

}




</script>

<style scoped>



</style>