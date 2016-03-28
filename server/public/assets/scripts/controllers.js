myApp.controller("AddController", ["$scope", "$http", "MovieService", function($scope, $http, MovieService){
    $scope.movies = {};
    $scope.data = [];


    $scope.search = function(data){
      console.log("We are going to go look for ", data);

      //------
      http://api.tvmaze.com/search/shows?q=girls

      //-----
      $http.get("http://api.tvmaze.com/search/shows?q="+ data.name ).then(function(response){
          console.log(response.data);
          $scope.data = response.data;
      });
    };

    $scope.addMovie = function(data){
        console.log("looking at some Data",data);

        var postObject = {};
        postObject.Name = data.name;
        postObject.Premiered = data.premiered;
        postObject.Summary = stripTags(data.summary);
        console.log("summary =",postObject.Summary);
        postObject.Image = data.image.medium;


        MovieService.postMovie(postObject);
    };
}]);

myApp.controller("ShowController", ["$scope", "MovieService", function($scope, MovieService){
    MovieService.getMovies();

    $scope.data = MovieService.data;
}]);
function stripTags(myText){

    var newText = myText.replace("<p>","");
    newText = newText.replace("</p>","");


    return newText
}
