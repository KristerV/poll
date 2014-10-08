Meteor.methods({
	'authPass': function(pass) {
		console.log(pass)
		if (pass === 'brewtphorce') {
			console.log("update")
			Collection.upsert({_id: 'admin'}, {isAdmin: true})
		}
	}
})