// view/FBFriendView.js
( function ( Views ) {

	Views.FBFriendView = Backbone.View.extend({
		
		tagName: "li",
		// get the HTML content of the #guestlist-template template
		guestTemplate: _.template($('#fbFriendTemplate').html()),

		events:{
			"click #fbFriendRemove" : "clear",
			"click #fbFriendAdd" 		: "addToGuestList"
		},

		initialize: function(){
			this.model.bind('remove', this.remove, this);
		},

		render: function(){
			//console.log("fbGuest render");
			// pass model attributes to template variable
			this.$el.html(this.guestTemplate(this.model.attributes));
			return this;
		},

		remove: function(){
			console.log("fbGuest remove");
			this.$el.remove();
			//this.model.destroy();
		},

		clear: function(){
			console.log("fbGuest clear");
			App.Collections.fbFriends.remove(this.model);
		},

		addToGuestList: function(){
			console.log("fbGuest addToGuestList");
			App.Views.appView.addGuestFromFB(this.model);
			this.clear();
		}

	});
})( App.Views );