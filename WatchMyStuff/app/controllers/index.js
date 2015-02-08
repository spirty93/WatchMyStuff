$.index.open();

var getActiveWatches = Ti.Network.createHTTPClient({
    onload: function() {
    	console.log(this.responseText);
    	var data = JSON.parse(this.responseText);
    	//var data = [{"user_id":666,"location_description":"In the corner of 3rd floor","requested_minutes":"5", "id": "12312"}];
    	var aggregate = [];
   		
		for (var i = 0; i < data.length; i++) {
			var a = Titanium.UI.createTableViewRow();
			a.title = data[i].user_id + " is looking for a watcher  " + data[i].location_description +
				 " requested time of wait is " + data[i].requested_minutes ;
			a.id = data[i].id;
			
			a.addEventListener('click', function(e) {
				applyFunc(a.id);
			});
			 
			$.WatchList.add(a);
		}
	}
});

getActiveWatches.open("GET", Titanium.API.URL + "/watches/unfulfilled");
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
	getJSON.open("POST", Titanium.API.URL + "/watches.json?user_id="+Titanium.API.userId+
													     "&user_name="+Titanium.API.user+
													     "&lat="+0+
													     "&lng="+0+
													     "&location_description="+$.watch_description.value+
													     "&requested_minutes="+$.requested_minutes.value+
													     "&location_picture=link");
	getJSON.send();
   	view.open();
}


$.index.addEventListener('open', function(){
	console.log(Ti.API.user);
	if (Titanium.API.user === ""){
		var view = Alloy.createController("Login", {}).getView();
		view.open();
	}
});

