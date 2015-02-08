$.index.open();

var getActiveWatches = Ti.Network.createHTTPClient({
    onload: function() {
    	console.log(this.responseText);
    	var data = JSON.parse(this.responseText);
    	var aggregate = [];
   		
		for (var i = 0; i < data.length; i++) {
			
			var a = Titanium.UI.createTableViewRow();
			a.title = data[i].id + ": " + data[i].user_name + " is looking for a watcher at: " + data[i].location_description +
				 "; Requested time of watch in minutes is " + data[i].requested_minutes ;
			a.borderRadius = "5"; 
			 console.log(data[i].id + " !");
			aggregate.push(a);
		}
		
		$.table.data = aggregate;
		$.table.addEventListener("click", function(e){
			applyFunc(e.rowData.title.split(":")[0]);
		});
	}
});

getActiveWatches.open("GET", Titanium.API.URL + "/watches/unfulfilled");
getActiveWatches.send();

var getYourWatches = Ti.Network.createHTTPClient({
    onload: function() {
    	console.log(this.responseText);
    	var data = JSON.parse(this.responseText);
    	var aggregate = [];
   		
		for (var i = 0; i < data.length; i++) {
			
			var a = Titanium.UI.createTableViewRow();
			a.title = data[i].id + ": " + data[i].user_name + " is looking for a watcher at: " + data[i].location_description +
				 "; Requested watching time is: " + data[i].requested_minutes ;
			console.log(data[i].id + " !");
			a.borderRadius = "5";
			a.borderColor = "Black";
			aggregate.push(a);
		}
		
		$.yourtable.data = aggregate;
		$.yourtable.addEventListener("click", function(e){
			applyFunc(e.rowData.title.split(":")[0]);
		});
	}
});

getYourWatches.open("GET", Titanium.API.URL + "/users/"+ Titanium.API.user_id + "/watches");
getYourWatches.send();

var rating_setter = Ti.Network.createHTTPClient({
						    onload: function() {
						    	var data = JSON.parse(this.responseText);
						    	console.log(data); 		
						    	$.your_rating.text = data.rating || 4;
							}
						});
	rating_setter.open("GET", Titanium.API.URL + "/users/" + Titanium.API.userId + ".json");
	rating_setter.send();

function ShowDialog(){
	$.dialog.show();
}

function StoreName(){
	alert("Stored");	
}

function RefreshClick(){
	//Delete
	//if ($.WatchList.getRows.length > 0) {
    ///for (var i = $.WatchList.rows.length-1; i >= 0; i--) {
    //    	$.WatchList.deleteRow(i);
   	//	}
	//}
	
	//Populate
	//getActiveWatches.open("GET", Titanium.API.URL + "/watches/unfulfilled");
	//getActiveWatches.send();
	
	console.log("Refresh");
	getActiveWatches.open("GET", Titanium.API.URL + "/watches/unfulfilled");
	getActiveWatches.send();
	getYourWatches.open("GET", Titanium.API.URL + "/users/"+ Titanium.API.userId + "/watches");
	getYourWatches.send();
	};

function doClick (e) {
	//Titanium.API.info(view);
	getJSONforRequested.open("POST", Titanium.API.URL + "/watches.json?user_id="+Titanium.API.userId+
													     "&user_name="+Titanium.API.user+
													     "&lat="+0+
													     "&lng="+0+
													     "&location_description="+$.watch_description.value+
													     "&requested_minutes="+$.requested_minutes.value+
													     "&location_picture=link");
	getJSONforRequested.send();
}

$.index.addEventListener('open', function(){
	console.log(Ti.API.user);
	if (Titanium.API.user === ""){
		var view = Alloy.createController("Login", {}).getView();
		view.open();
	}
});
