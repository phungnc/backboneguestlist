// view/FBFriendListView.js
( function ( Views ) {


	Views.FBFriendListView = Backbone.View.extend({
		
		el: "#sidebar",

		events: {

			"click #load-fb-friends" : "getFBFriend",
		},

		initialize: function(){

			this.collection.on('add', this.addOne,this);
			this.collection.on('reset',this.render,this);
			this.collection.on('change', this.render,this);
			this.collection.on('fb.disconnected',this.render,this);
			this.addAll();
		},

		render: function(){
			$('#load-fb-friends').button('reset');
			this.addAll();
			return this;
		},

		addOne: function( guest ){

			var view = new Views.FBFriendView({model:guest});
			// insert into the #guest-list container			
			$('#fbFriends').append(view.render().el);
		},

		addAll: function(){

			$('#fbFriends').empty();
			this.num = 0;
			this.collection.each (this.addOne);
		},

		getFBFriend: function(events){
			$('#load-fb-friends').button('loading');
			$('#fbFriends').empty();
			events.preventDefault();
			this.collection.getFriends();
		}
		
	});
})( App.Views );