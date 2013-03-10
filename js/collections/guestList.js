// collection/guestList.js
(function ( Collections, Model ){

	Collections.GuestList = Backbone.Collection.extend({

		model: Model,

		localStorage: new Store("guestList"),

		initialize: function(){
			console.log("guestList initialize");
		}

	})

})(App.Collections, App.Models.Guest);