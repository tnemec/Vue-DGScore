import axios from 'axios'



export default() {
	newUser(user) {

		return new Promise( function(resolve, reject) {

			const config = {

				data: {
					mode : 'put';
					type : 'user';
					key : 'JBF3JVB43NKNCS';
					user : {
						'fname' : user.fname,
						'lname' : user.lname,
						'email' : user.email,
						'password' : user.pwd,
						'pdga': user.pdga,
						'source' : 'dgscore'
					 	
					}
				},
				method: 'post',
				url = 'https://my6xevqs1l.execute-api.us-west-2.amazonaws.com/beta',
			}


			this.axios(config).then(response => {
				resolve(response);
			}).catch(err => {
				reject(response);
			});

		})



	}

}