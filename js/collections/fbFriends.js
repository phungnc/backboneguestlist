// collection/fbFriends.js
(function ( Collections, FBFriendModel ){

	Collections.FBFriends = Backbone.Collection.extend({

		model: FBFriendModel,

		initialize: function( attributes, options ){
			// binding "this" to callback function. Its value for this is not lost
			_.bindAll(this, 'cbGetLoginStatus');
			options || (options = {});
			this.options = _.defaults(options, this.defaultOptions);
		},

		options: null,

		defaultOptions: {
			// see https://developers.facebook.com/docs/authentication/permissions/
			scope: ['read_friendlists,friends_photos,user_photos'], // fb permissions
			autoFetch: true, // auto fetch profile after login
		},

		/*
		 * 
		 *
		 *
		 */

		login: function(){

			FB.Event.subscribe('auth.authResponseChange',this.cbGetLoginStatus);
			FB.login(function(response) {
				if (response.authResponse) {
					console.log("You connected!");
				} else {
					console.log("You cancelled");
					// cancelled
				}
			},{ scope: this.options.scope.join(',') });

		},

		/*  
		 * callback function for FB.getLoginStatus.
		 * 
		 *
		 */

		cbGetLoginStatus: function(response) {

			if (response.status === 'connected') {

				console.log("connected");
				if( this.options.autoFetch === true ) this.fetch();

			} else if ( response.status === 'not_authorized' ) {

				// not_authorized
				console.log("not_authorized");
				this.login();

			} else {
				// not_logged_in
				console.log("disconnected");
				this.login();
				this.trigger("fb.disconnected",this)

			}
		},

		/*
		 * get friend list 
		 *
		 *
		 */
		getFriends: function(){
			// First of All, get Login Status
			FB.getLoginStatus(this.cbGetLoginStatus);
		},

		/*
		 * 
		 *
		 *
		 */
		sync: function( method, model, options ){

			if(method !== 'read') throw new Error('FacebookUser is a readonly model, cannot perform ' + method);

			var callback = function(response){
				if( response.error ) {
					options.error(response);
				} else {
					options.success(response);
				}
				return true;
			};
			FB.api({
				method:'fql.multiquery',
				queries: {

						'query1' : 'SELECT flid, owner, name, type FROM friendlist WHERE owner=me()',
						'query2' : 'SELECT uid, flid FROM friendlist_member WHERE flid IN (SELECT flid FROM #query1) ORDER BY flid',
						'query3' : 'SELECT uid, name, pic_square FROM user WHERE uid IN (SELECT uid FROM #query2) OR uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'

				}
			}, callback);
		},
		/*
		 * 
		 *
		 *
		 */
		 
		parse: function(response) {

				var friendLists 				=	response[0].fql_result_set,
						friendListMembers 	=	response[1].fql_result_set,
						friends 						=	response[2].fql_result_set;

				_.each(friends,function(friend) {

					// limit friend number, just for testing
					if ( this.length > 5 )  return (false);
					var uid = 0;
					var flid = 0;
					
					//friend.name = val.name ;
					friend.group = '';
					friend.avatar = friend.pic_square ;
					uid = friend.uid;

					var flm = _.find(friendListMembers,function(friendListMember){
						return friendListMember.uid == uid;
					},uid);

					if (flm) {

						flid = flm.flid;
						var fl = _.find(friendLists,function(friendList) {
							return friendList.flid == flid; 
						}, flid);

						if (fl) { 
							friend.group = fl.name; 
						}

					} else {
						friend.group = "Untitle";
					}

					this.push(friend);

				},this);
				return this.models;				
		},

	})


})(App.Collections, App.Models.FBFriendModel);