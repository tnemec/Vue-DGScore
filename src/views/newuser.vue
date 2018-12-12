<template>
  <div class="newuser">

    <h1>DG Score</h1>

    <p class="about">Create an account to save your rounds to the cloud.</p>


    <div class="section">
      <h2>New User Account</h2>


      <div v-if="message.length">{{message}}</div>

      <b-form :name="newuserform" @submit.prevent="handleSubmit">

              <b-form-group label="First Name" label-for="fname">
                <b-form-input id="fname" v-model="newuser.fname"/>
              </b-form-group>
              <b-form-group label="Last Name" label-for="lname">
                <b-form-input id="lname" v-model="newuser.lname"/>
              </b-form-group>  
              <b-form-group label="Email" label-for="email">
                <b-form-input id="email" v-model="newuser.email"/>
              </b-form-group> 
              <b-form-group label="Password" label-for="pwd">
                <b-form-input id="pwd" :type="password" v-model="newuser.pwd"/>
              </b-form-group>  
              <b-form-group label="Confirm Password" label-for="pwd2">
                <b-form-input id="pwd2" :type="password" v-model="newuser.pwd2"/>
              </b-form-group>                                                       
              <b-form-group label="PDGA Number" label-for="pdga">
                <b-form-input id="pdga" v-model="newuser.pdga"/>
              </b-form-group>     


              <div class="button-grp">
                  <b-button @click="cancel">Cancel</b-button>               
                  <b-button :variant="primary" :type="submit">Submit</b-button>
              </div>

              




      </b-form>

    </div>



  </div>
</template>

<script>
import authService from '../services/authservice'


export default {
  name: 'newuser',
  components: {

  },
  data() {
  	return {
      newuser : {
        fname: '',
        lname: '',
        email: '',
        pwd: '',
        pwd2: '',
        pdga: '',
        uuid: 0
      },
      message: ''
  	}
  },
  computed : {

  },
  methods: {
    cancel() {
      router.go(-1);
    },
    handleSubmit() {
      authService.newuser(this.newuser).then(response => {
        this.message = 'Account Created <br>' + JSON.stringify(response, null, 4)
      }).catch(err => {
        this.message = JSON.stringify(err, null, 4)
      });
    },
    showErr(field, err) {

    }
  }

}




</script>

<style scoped>



</style>