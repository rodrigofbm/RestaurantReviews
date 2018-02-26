function addRestaurant(){
	var database = firebase.database();
	var restaurantRef = database.ref('/restaurants/');

	var restaurantInput = document.getElementById('addRestaurant');
	var restaurantName = restaurantInput.value;

	restaurantInput.value = '';

	return restaurantRef.push({
		name: restaurantName,
		votes: 0
		})
		.then(() =>{
			window.location.reload();
		})
		.catch((err) => {
			console.log(err);
		});

}

function upvote(key){
	console.log(key);
	var database = firebase.database();
	var user = firebase.auth().currentUser;
	var userId = user.uid;
	var displayName = user.displayName;
	var restaurantVotesRef = database.ref('/restaurants/' )
									 .child(key)
									 .child('/votes')
									 .child(userId);



	restaurantVotesRef.set(displayName)
		.then(() =>{
			window.location.reload();
		})
		.catch((err) => {
			console.log(err);
		});
}

function downvote(key){
	console.log(key);
	var database = firebase.database();
	var user = firebase.auth().currentUser;
	var userId = user.uid;
	var restaurantVotesRef = database.ref('/restaurants/' )
									 .child(key)
									 .child('/votes')
									 .child(userId)
									 .remove()
									 .then(() =>{
									 	window.location.reload();
									 })
									 .catch((err) =>{
									 	console.log(err);
									 });
}
