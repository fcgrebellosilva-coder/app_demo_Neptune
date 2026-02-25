//  ajaxSuccess event
var xhr = arguments[0];

// get json data from response
var data = xhr.responseJSON;

if (!data) return;

if (data.Response === "True") {
  appModel.setProperty("/movies", [data]);
} else {
  appModel.setProperty("/movies", []);
}