Template.poll.helpers({
	result: function() {
		return "result"
	},
	isAdmin: function() {
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