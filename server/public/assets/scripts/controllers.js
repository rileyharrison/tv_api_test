myApp.controller("AddController", ["$scope", "$http", "MovieService", function($scope, $http, MovieService){
    $scope.movies = {};
    $scope.data = [];

    $scope.search = function(data){
      console.log("We are going to go look for ", data);

      //------
      //http://thetvdb.com/api/GetSeries.php?seriesname=rescue+me&language=en

      //-----
      $http.get("      http://thetvdb.com/api/GetSeries.php?seriesname=" + data.name + "rescue+me&language=en").then(function(response){
          console.log(response.data);
          $scope.data = [];
          $scope.data.push(response.data);
      });
    };

    $scope.addMovie = function(data){
        console.log(data);

        var postObject = {};
        postObject.Title = data.Title;
        postObject.Runtime = data.Runtime;
        postObject.Rated = data.Rated;
        postObject.Actors = data.Actors;
        postObject.Plot = data.Plot;

        MovieService.postMovie(postObject);
    };
}]);

myApp.controller("ShowController", ["$scope", "MovieService", function($scope, MovieService){
    MovieService.getMovies();

    $scope.data = MovieService.data;
}]);
