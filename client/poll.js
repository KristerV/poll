Session.set('user', Math.random().toString(36).substr(2, 8))

Template.poll.helpers({
	item: function() {
		var q = Questions.findOne({}, {sort: {timestamp: -1}})
		if (!_.isUndefined(q) && q.question != '')
			return q
	},
	result: function() {
		var q = Questions.findOne({}, {sort: {timestamp: -1}})
		if (_.isUndefined(q) || _.isUndefined(q.votes))
			return '0 / 0'

		var votes = q.votes
		var yes = 0
		var no = 0

		_.each(votes, function(vote) {
			if (vote == 'yes')
				yes++
			else if (vote == 'no')
				no++
		})
		return yes + ' / ' + no
	}
})

Template.poll.events({
	'submit form[name="question"]': function(e, tmpl) {
		e.preventDefault()
		var question = $('input[name="question"]').val()
		var yes = $('input[name="yes"]').val()
		var no = $('input[name="no"]').val()
		var timestamp = TimeSync.serverTime(new Date().getTime())

		if (question == '')
			return false

		if (yes == '')
			yes = 'Jah'

		if (no == '')
			no = 'Ei'

		var last = Questions.findOne({}, {sort: {timestamp: -1}})
		if (_.isUndefined(last))
			Questions.insert({
				question: question,
				yes: yes,
				no: no,
				timestamp: timestamp,
				votes: {},
			})
		else
			Questions.update(last._id, {$set: {
				question: question,
				yes: yes,
				no: no,
				}
			})
	},
	'click form[name="vote"] input': function(e, tmpl) {
		e.preventDefault()
		var vote = $(e.currentTarget).attr('name')
		var last = Questions.findOne({}, {sort: {timestamp: -1}})
		data = {votes: {}}
		data['votes'][Session.get('user')] = vote
		Questions.update(last._id, {$set: data})
	},
	'click button[name="new"]': function(e, tmpl) {
		Questions.insert({
			question: '',
			yes: '',
			no: '',
			timestamp: TimeSync.serverTime(new Date().getTime()),
			votes: {},
		})
		$('input[name="question"]').val('')
		$('input[name="yes"]').val('')
		$('input[name="no"]').val('')
	}
})

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
