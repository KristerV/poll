Template.poll.helpers({
	result: function() {
		return "result"
	},
	isAdmin: function() {
		var coll = Collection.findOne('admin')
		console.log("check again")

		if (! _.isUndefined(coll) && coll.admin.isAdmin === true)
			return true
	},
	name: function() {
		return ""
	}
})

Template.poll.events({
	'submit form[name="name"]': function(e, tmpl) {
		e.preventDefault()
		console.log("hi")
	},
	'submit form[name="pass"]': function(e, tmpl) {
		e.preventDefault()
		var pass = $('input.pass').val()
		Meteor.call("authPass", pass)
	},
})