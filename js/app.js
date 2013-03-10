//app.js
//Top-level namespaces for our code

(function(){

	window.App = {};
	App.Collections = {};
	App.Models = {};
	App.Views = {};
	App.Utils = {};
	App.Views.Groups = [];


	// Defer initialization until doc ready.
	$(function(){

			//App.Models.guestModel = new App.Models.Guest();
			App.Collections.guestList = new App.Collections.GuestList();
			App.Views.appView = new App.Views.AppView({collection: App.Collections.guestList});

			window.fbAsyncInit = function() {

					FB.init({
							appId      : '608841999133234', // App ID
							//channelUrl : channelurl, // Channel File
							status     : true, // check login status
							cookie     : true, // enable cookies to allow the server to access the session
							xfbml      : true  // parse XFBML
					});
					 // Additional initialization code such as adding Event Listeners goes here
						//App.Models.fbFriendModel = new App.Models.FBFriendModel();
						App.Collections.fbFriends = new App.Collections.FBFriends();
						App.Views.fbFriendListView = new App.Views.FBFriendListView({collection: App.Collections.fbFriends});
					};   
						// Load the SDK Asynchronously
					(function(d){
							 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
							 if (d.getElementById(id)) {return;}
							 js = d.createElement('script'); js.id = id; js.async = true;
							js.src = "//connect.facebook.net/en_US/all.js";

							 ref.parentNode.insertBefore(js, ref);
					}(document));
			});

})();
