var getActiveWatches = Ti.Network.createHTTPClient({
    onload: function() {
    	var data = JSON.parse(this.responseText);
    	data = [{"id":1,
    		"user_id":1,
    		"watcher_id":2,
    		"lat":"123.0",
    		"lng":"321.0",
    		"location_description":"In the corner of 3rd floor",
    		"location_picture":"alink",
    		"requested_minutes":5,
    		"start_time":"2015-02-07T11:16:34.323Z",
    		"end_time":"2015-02-07T11:21:34.323Z",
    		"status":"Finished Watch",
    		"url":"http://0.0.0.0:3000/watches/1.json"}];
		for (var watch in data){
			var a = Titanium.UI.createTableViewRow();
			a.title = "User " + watch.user_id + " is looking for a watcher at " + watch.location_description + " for " + watch.requested_minutes; 
			$.WatchList.add(a);
		}
	}
});


$.index.open();
getActiveWatches.open("GET", "http://ip.jsontest.com/");
getActiveWatches.send();

function ShowDialog(){
	$.dialog.show();
}

function StoreName(){
	alert("Stored");	
}

function doClick (e) {
	var view = Alloy.createController("WatchComplete", {}).getView();
	Titanium.API.info(view);
   	view.open();
}

$.index.addEventListener('open', function(){
	console.log(Ti.API.user);
	if (Ti.App.user !== null){
		var view = Alloy.createController("Login", {}).getView();
		view.open();
		getJSON.open("GET", "http://ip.jsontest.com/");
		getJSON.send();
		alert(Titanium.API.LastJsonQuery);
	}
});

