// view/guestView.js
( function ( Views ) {

	Views.Guest = Backbone.View.extend({
		
		tagName: "li",
		//className: "a.group",
		// get the HTML content of the #guestlist-template template
		guestTemplate: _.template($('#guestTemplate').html()),

		events:{
			"click .icon-remove" : "clear",
			//"dblclick .fullname" : "changeName",
			//"click .group" : "changeGroup"
		},

		initialize: function(){
			//console.log("guestView initialize");
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
			this.model.bind('add',this.save,this);

		},

		//__group : [],
		render: function(){
			console.log("Guest render");
			// pass model attributes to template variable
			this.$el.html(this.guestTemplate(this.model.attributes));

			$(this.el.getElementsByClassName("fullname")).editable({
					params: this,
					mode: 'inline',
					showbuttons: false,
					//placement:'bottom',
					unsavedclass: null,
					url:this.changeName
				});

			$(this.el.getElementsByClassName("group")).editable({
					source: App.Views.Groups,
					//source: this.__group,
					sourceCache: false,
					params: this,
					//mode: 'inline',
					showbuttons: false,
					placement:'bottom',
					unsavedclass: null,
					url:this.changeGroup
				});

			$(this.el.getElementsByClassName("confirm")).editable({
					source: [{value: 0,text:"No"},{value:1,text:"Yes"}],
					params: this,
					//autotext: 'always',
					mode: 'inline',
					showbuttons: false,
					inputclass: 'input-mini',
					placement:'bottom',
					unsavedclass: null,
					url:this.changeConfirm
				});

			$(this.el.getElementsByClassName("number")).editable({
					params: this,
					mode: 'inline',
					showbuttons: false,
					inputclass: 'input-smini',
					//placement:'bottom',
					unsavedclass: null,
					validate: function(value){
						if($.trim(value) < 0){ 
							return "Number must >= 0";
						}
					},
					url:this.changeNumber
				});
			$(this.el.getElementsByClassName("icon-remove")).tooltip();
			//
			if(this.model){
				groupName = this.model.attributes.group
				var g = _.find(App.Views.Groups,function(group) {
					return group.text == groupName;
				},groupName );

				if(!g) {;	
					App.Views.Groups.push({value: groupName , text:groupName});	
				}
			} 
	
			return this;
		},

		changeName: function(params){
			console.log("Guest changeName");
			//params.model.set("name",params.value);
			params.model.save({name:params.value},{silent:true});	
			return true;
		},		

		changeNumber: function(params){
			console.log("Guest changeNumber");
			//params.model.set("number",params.value);
			var num = parseInt(params.value);
			if(num>0){
				//params.model.set({confirm: 1, number:num},{silent: true});
				params.model.save({confirm: 1, number:num});
			} else {
				//params.model.set({confirm: 0, number:num},{silent: true});
				params.model.save({confirm: 0, number:num});
			}
			//params.model.save();	
			return true;
		},

		changeConfirm: function(params){
			console.log("Guest changeConfirm");
			var conf = parseInt(params.value);
			//params.model.set("confirm",bl);
			if(conf){
				params.model.save({confirm: 1, number:1});
			} else {
				params.model.save({confirm: 0, number:0});
			}
			//params.model.save({silent: true});
			return true;
		},

		changeGroup: function(params){
			console.log("Guest changeGroup");
			/*
			events.preventDefault();
			var currentTarget = events.currentTarget;
			//var seft = this;
			$(currentTarget.parentNode.parentNode).siblings().html(currentTarget.text+'<b class="caret"></b>');
			this.model.set("group",currentTarget.text);
			this.model.save();
			*/
			//params.model.set("group",params.value);
			params.model.save({group:params.value},{silent:true});	
			return params.value;

		},
		remove: function(){
			console.log("Guest remove");
			this.$el.remove();
		},

		clear: function(){
			console.log("Guest clear");
			this.model.destroy();
		},

	});
})( App.Views );