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
Titanium.API.URL = "104.131.121.221";
Titanium.API.user = "";

var getJSON = Ti.Network.createHTTPClient({
    onload: function() {
    	Titanium.API.LastJsonQuery = JSON.parse(this.responseText);
	}
});

var getJSONforRequested = Ti.Network.createHTTPClient({
    onload: function() {
    	var j = JSON.parse(this.responseText);
    	applyFunc(j.id);
	}
});

function applyFunc(id) {
	console.log(id);
	transitionBasedOnStatus.open("GET", Titanium.API.URL + "/watches/" + id + ".json");
	transitionBasedOnStatus.send();
}


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
    	Titanium.API.user = data.name;
    	Titanium.API.userId = data.id;
    	var view = Alloy.createController("index", {});
    	view.open();
   },
    onerror: function () {
      	var view = Alloy.createController("index", {});
		view.open();
	},	
});
