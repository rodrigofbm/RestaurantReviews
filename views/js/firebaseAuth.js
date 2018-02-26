function checkIfLoggedin(){
	firebase.auth().onAuthStateChanged((user) => {
			if (user) {

				var myName = user.displayName;
				var photoURL = user.photoURL;


				document.getElementById('google-pic')
				.setAttribute('src', photoURL)

				document.getElementById('google-displayname')
				.innerHTML = myName;

				document.getElementById('gone')
				.setAttribute('style', 'display: none; visibility: hidden');

				document.getElementById('signout')
				.setAttribute('style', 'display: inline-block; visibility: visible');

				document.getElementById('ifLoggedIn')
				.setAttribute('style', 'display: inline-block; visibility: visible');

				console.log('logged in');
				console.log(user);

			}else{
				document.getElementById('gone')
				.setAttribute('style', 'display: inline-block; visibility: visible');

				document.getElementById('signout')
				.setAttribute('style', 'display: none; visibility: hidden');

				document.getElementById('ifLoggedIn')
				.setAttribute('style', 'display: none; visibility: hidden');

				console.log('signout in');

				

	
			}
		});
		
}

checkIfLoggedin();

function signOut(){
	firebase.auth().signOut();

	document.getElementById('google-pic')
				.setAttribute('src', '');

	document.getElementById('google-displayname')
				.innerHTML = '';

	document.getElementById('ifLoggedIn')
				.setAttribute('style', 'display: none; visibility: hidden');

	
}

function signInWithGoogle(){
	var provider = new firebase.auth.GoogleAuthProvider;

	firebase.auth().signInWithPopup(provider)
		.then( (response) => {
			var myName = response.additionalUserInfo.profile.name;
			var photoURL = response.additionalUserInfo.profile.picture;

			document.getElementById('google-pic')
			.setAttribute('src', photoURL)

			document.getElementById('google-displayname')
			.innerHTML = myName;

			checkIfLoggedin();
		})
		.catch( (err) =>{
			console.log(err);
		});
}