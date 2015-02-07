// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Titanium.API.LastJsonQuery = 0;

var getJSON = Ti.Network.createHTTPClient({
    onload: function() {
    	Titanium.API.LastJsonQuery = JSON.parse(this.responseText);
	}
});

var transitionBasedOnStatus = Ti.Network.createHTTPClient({
    onload: function() {
    	var data = JSON.parse(this.responseText);
    	if (data.status == "Unfulfilled Watch"){
    		var view = Alloy.createController("UnfulfilledWatch", data).getView();
			view.open();
    	}
    	else if (data.status == "Accepted Watch"){
    		var view = Alloy.createController("AcceptedWatch", data).getView();
			view.open();
    	}
    	else if (data.status == "Watcher Arrived"){
    		var view = Alloy.createController("WatcherArrived", data).getView();
			view.open();
    	}
    	else if (data.status == "In-progress Watch"){
    		var view = Alloy.createController("InProgressWatch", data).getView();
			view.open();
    	}  
    	else if (data.status == "Finished Watch"){
    		var view = Alloy.createController("WatchComplete", data).getView();
			view.open();
    	}
	}
});

var logIn = Ti.Network.createHTTPClient({
	onload: function () {
    	var data = JSON.parse(this.responseText);
    	var view = Alloy.createController("index", {});
    	Ti.API.user = 3;
    	view.open();
   },
    onerror: function () {
      	var view = Alloy.createController("index", {});
		view.open();
	},	
});
