//  ajaxSuccess event
var xhr = arguments[0];

// get json data from response
var data = xhr.responseJSON;

var rows = Array.isArray(data) ? data : (data && data.value ? data.value : []);

//create new property for model
appModel.setProperty("/favoriteMovies", rows);

if (rows.length === 0) {
  sap.m.MessageToast.show("No Movies");
}