$.index.open();

function doClick (e) {
	 var view = Alloy.createController("monitorWatch", {}).getView();
	 Titanium.API.info(view);
   	 view.open();
};