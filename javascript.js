angular.module('PortalApp')

.controller('widgetCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

  	$scope.company = [];
	$scope.time = [];
	$scope.date = [];
	$scope.description;
  	$scope.AllData;
    // SETUP

    // Widget Configuration
    $scope.portalHelpers.config = {
        "title": "Test Project",
        "icon": "icon-bell"
    };
  
    // Show loading message in the first column
    $scope.portalHelpers.showView('loading.html', 1);
  
    $http.get('/Develop/GetProxy?url=http://www.ceca.uwaterloo.ca/students/sessions.php').success(function(data){
	//console.log(data);
    $scope.AllData = $(data);
    $scope.AllData = $scope.AllData.find('[onmouseover]');
    
    // determine size of object
    /*for (var k in AllData) {
    	if (hello.hasOwnProperty(k)) { 
          ++count; 
        } 
    }*/
    
    
    // extract key elements from AllData
    for (i = 0; i < $scope.AllData.length; i++) {
    	$scope.company.push(String($scope.AllData[i].getAttribute("onmouseover")).split("<br>")[0].split("</b>: ")[1]);
      	$scope.date.push(String($scope.AllData[i].getAttribute("onmouseover")).split("<br>")[1].split("</b>: ")[1]);
      	$scope.time.push(String($scope.AllData[i].getAttribute("onmouseover")).split("<br>")[2].split("</b>: ")[1]);
    }
      //console.log("Company: " + company);
	$scope.portalHelpers.showView($scope.company, 1);
      
  });

}])
// Custom directive example
.directive('DirectiveName', ['$http', function ($http) {
    return {
        link: function (scope, el, attrs) {

        }
    };
}])
// Custom filter example
.filter('FilterName', function () {
    return function (input, arg1, arg2) {
        var output = input;
        return output;
    }
});