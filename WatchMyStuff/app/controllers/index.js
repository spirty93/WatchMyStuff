$.index.open();

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
	if (!Ti.App.LogInName){
		var view = Alloy.createController("Login", {}).getView();
		view.open();
	}
});