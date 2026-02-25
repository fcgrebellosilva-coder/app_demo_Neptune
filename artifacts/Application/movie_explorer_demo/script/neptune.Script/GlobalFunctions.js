var appModel; 

// Initializes the app
function initializeApp() {
    // Create a JSON model
    appModel = new sap.ui.model.json.JSONModel({
        movies: [],
        selectedMovie: {},
        newMovie: {}
    });
    App.setModel(appModel, "appModel");

    createTableTemplate();

    loadMovieList();

    configureResponsiveTable();
    
}

// Fetches the list of movies from the external api
function loadMovieList() {

    apigetmovieapi().success(function(data) {
        appModel.setProperty("/movies", data);

    }).error(function(err) {
        sap.m.MessageBox.error("Failed to load movie list.");
    });
}

// Creates the template for the movie table
function createTableTemplate() {
    var movieTemplate = new sap.m.ColumnListItem({
        type: "Navigation",
        
        cells: [
            new sap.m.Image({ src: "{appModel>Poster}" }),
            new sap.m.Text({ text: "{appModel>Title}" }),
            new sap.m.Text({ text: "{appModel>Year}" }),
            new sap.m.Text({ text: "{appModel>Genre}" }),
            new sap.m.Text({ text: "{appModel>Director}" }),
            new sap.m.Text({ text: "{appModel>Plot}" }),
            new sap.m.Text({ text: "{appModel>Runtime}" }),
            new sap.m.Button({
                icon: "sap-icon://favorite",
                text: "Add",
                press: function(oEvent) {
                    // Get row data 
                    var row = oEvent.getSource().getBindingContext("appModel").getObject();
                    addToFavorites(row);
                }
            })
        ]
    });

    if (typeof Table !== 'undefined') {
        Table.bindItems({
            path: "appModel>/movies",
            template: movieTemplate
        });
    }
}

// Configures the main movie table to be responsive
function configureResponsiveTable() {
    if (typeof Table !== 'undefined') {
        var columns = Table.getColumns();
        if (columns[0]) {
            columns[0].setMinScreenWidth("Desktop");
            columns[0].setDemandPopin(false);
        }
        if (columns[1]) {
            columns[1].setMinScreenWidth("Phone");
            columns[1].setDemandPopin(false);
        }
        if (columns[2]) {
            columns[2].setMinScreenWidth("Tablet");
            columns[2].setDemandPopin(true);
        }
        if (columns[3]) {
            columns[3].setMinScreenWidth("Tablet");
            columns[3].setDemandPopin(true);
        }
        if (columns[4]) {
            columns[4].setMinScreenWidth("Desktop");
            columns[4].setDemandPopin(true);
        }
        if (columns[5]) {
            columns[5].setMinScreenWidth("Desktop");
            columns[5].setDemandPopin(true);
        }
        if (columns[6]) {
            columns[6].setMinScreenWidth("Desktop");
            columns[6].setDemandPopin(true);
        }
    }
}

// Search Event that seacrh movie by title
function handleSearch(oEvent) {
    var query = oEvent.getParameter("query");
    if (query && query.length > 0) {
        var options = {
            parameters: {
                apikey: "461038a8",
                t: query
            }
        };
        apigetmovieapi(options); 
    } else {
        if (typeof Table !== 'undefined') {
            Table.setModel(appModel, "appModel"); 
            Table.bindItems({
                path: "appModel>/movies",
                template: Table.getBindingInfo("items").template
            });
        }
    }
}
// Add to favorites action, adds a new movie to movie DB
function addToFavorites(movieInfo){

    var tempObj = {
        Title : movieInfo.Title,
        Poster : movieInfo.Poster,
        Year : movieInfo.Year,
        Genre : movieInfo.Genre,
        Director : movieInfo.Director,
        Plot : movieInfo.Plot,
        Duration : movieInfo.Runtime
    };

    var options = {
        data: tempObj
    };

    apigetmovietable({})
    .success(function(data) {

        var exists = data.some(function (m) {
            return (m.Title || "").toLowerCase() === 
                   (movieInfo.Title || "").toLowerCase();
        });

        if (!exists) {
            apipostmovietable(options)
            .success(function(){
                sap.m.MessageToast.show("Added to favorites");
            });
        } else {
            sap.m.MessageToast.show("Already in favorites");
        }

    })
    .error(function() {
        sap.m.MessageBox.error("Failed to load movie list.");
    });
}

//-----------------------------------FavoriteMoviesPage--------------------------------

// Load movies from the movie DB 
function loadFavoriteMovieList() {
    apigetmovietable().success(function(data) {
        appModel.setProperty("/favoriteMovies", data);

    }).error(function(err) {
        sap.m.MessageBox.error("Failed to load movie list.");
    });
}

// Creates the template for the movie table on the FavoriteMoviesPage
function createTable1Template() {
    var movieTemplate = new sap.m.ColumnListItem({
        type: "Navigation",
        
        cells: [
            new sap.m.Image({ src: "{appModel>Poster}" }),
            new sap.m.Text({ text: "{appModel>Title}" }),
            new sap.m.Text({ text: "{appModel>Year}" }),
            new sap.m.Text({ text: "{appModel>Genre}" }),
            new sap.m.Text({ text: "{appModel>Director}" }),
            new sap.m.Text({ text: "{appModel>Plot}" }),
            new sap.m.Text({ text: "{appModel>Duration}" }),
            new sap.m.Button({
                icon: 'sap-icon://delete',
                press :function(oEvent) {
                    var row = oEvent.getSource().getBindingContext("appModel").getObject();
                    deleteFromFavorites(row);
                    
                }
            })
          
        ]
    });

    if (typeof Table1 !== 'undefined') {
        Table1.bindItems({
            path: "appModel>/favoriteMovies",
            template: movieTemplate
        });
    }
}

// Configures the main movie table to be responsive
function configureResponsiveTable1() {
    if (typeof Table1 !== 'undefined') {
        var columns = Table1.getColumns();
        if (columns[0]) {
            columns[0].setMinScreenWidth("Desktop");
            columns[0].setDemandPopin(false);
        }
        if (columns[1]) {
            columns[1].setMinScreenWidth("Phone");
            columns[1].setDemandPopin(false);
        }
        if (columns[2]) {
            columns[2].setMinScreenWidth("Tablet");
            columns[2].setDemandPopin(true);
        }
        if (columns[3]) {
            columns[3].setMinScreenWidth("Tablet");
            columns[3].setDemandPopin(true);
        }
        if (columns[4]) {
            columns[4].setMinScreenWidth("Desktop");
            columns[4].setDemandPopin(true);
        }
        if (columns[5]) {
            columns[5].setMinScreenWidth("Desktop");
            columns[5].setDemandPopin(true);
        }
        if (columns[6]) {
            columns[6].setMinScreenWidth("Desktop");
            columns[6].setDemandPopin(true);
        }
    }
}


// Delete movie from the movie DB 
function deleteFromFavorites(movieInfo){
    
    var options = {
        parameters: {
            where: JSON.stringify({ id: movieInfo.id })
        }};
    apideletemovietable(options)
    
}

initializeApp();

