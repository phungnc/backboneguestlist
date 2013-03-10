// view/guestView.js
( function ( Views ) {


	Views.AppView = Backbone.View.extend({
		
		el: "#main",

		events: {
			"keyup #q" : "searchByName"
		},

		initialize: function(){
			console.log("appView initialize");
			this.input = this.$('#q');

			this.collection.on('add', this.addOne,this);
			this.collection.on('reset',this.render,this);
			this.collection.fetch();
		},

		render: function(){
			console.log("appView render");
			this.addAll();
			return this;
		},

		getGroup: function(){
			console.log("appView getGroup");
			var group = [];
			this.collection.each(function(model){group.push(model.attributes.group)});
			return group;
		},


		addOne: function( guest ){
			console.log("appView addOne");
			var view = new Views.Guest({model:guest});
			// insert into the #guest-list container			
			$('#guestList').append(view.render().el);
		},

		addAll: function(){
			console.log("appView addAll");
			$('#guestList').empty();
			this.collection.each (this.addOne);
		},

		searchByName: function(events){
			console.log("appView searchByName:");
			events.preventDefault();
			var key = this.input.val();
			key = utils.stripUnicode(key);
			var result = [];
			
			this.collection.each(function(model){ 
				var guestName = utils.stripUnicode(model.attributes.name);
				if( guestName.toLowerCase().indexOf(key.toLowerCase() ) >= 0 )
					result.push(model);
			});
			$('#guestList').empty();
			_.each(result,this.addOne);
			return result;
		},


		addGuestFromFB: function(guest){
			console.log("appView addGuestFromFB");
			var attributes = _.extend(guest.attributes, {confirm: 0, number: 0});
			this.collection.create(attributes);
		}
	});
})( App.Views );