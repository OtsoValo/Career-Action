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
      
      
      // extract key elements from AllData
      for (i = 0; i < $scope.AllData.length; i++) {
          $scope.company.push(String($scope.AllData[i].getAttribute("onmouseover")).split("<br>")[0].split("</b>: ")[1]);
          $scope.date.push(String($scope.AllData[i].getAttribute("onmouseover")).split("<br>")[1].split("</b>: ")[1]);
          $scope.time.push(String($scope.AllData[i].getAttribute("onmouseover")).split("<br>")[2].split("</b>: ")[1]);
      }
        //console.log("Company: " + company);
      $scope.portalHelpers.showView('main.html', 1);

    });

    
    

  
  
    // Initialize input variable
    $scope.insertValue = { value: "Testing" };
  
  	//Dummy data for testing
  $scope.InfoSession = { date:"March 2, 2015", title: "Info Session" };

    // Show loading message in the first column
    $scope.portalHelpers.showView('loading.html', 1);

    // Show loading animation
    $scope.portalHelpers.toggleLoading(true);

    // DATABASE EXAMPLE

    $scope.getDbData = function () {
        $scope.portalHelpers.invokeServerFunction('getData').then(function (result) {
            $scope.dbData = result;
        });
    }
    $scope.InfoSession.title = $scope.insertValue.value;

    // Try to get test data from the database
    $scope.getDbData();

    // Create table
    $scope.createTable = function () {
        $scope.portalHelpers.invokeServerFunction('createTable').then(function (result) {
            $scope.getDbData();
        });
    }

    // Insert a value into the database
    $scope.insertData = function () {
        if ($scope.insertValue.value.length > 50)
            alert('value should be less than 50 characters');
        else {
            $scope.portalHelpers.invokeServerFunction('insert', { value: $scope.insertValue.value }).then(function (result) {
                $scope.dbData = result;
            });
        }
    }; 
    
    // DETAILS VIEW EXAMPLE--layers
  
    $scope.showView2 = function (item) {
      	$scope.details = item;
        $scope.portalHelpers.showView('view2.html', 2);
    }

    $scope.showView3 = function () {
        $scope.portalHelpers.showView('view3.html', 3);
    }

    
    
    // PORTAL DATA SOURCE EXAMPLE

    // Get data for the widget
    $http.get('/ImportantLinks/JSONSource').success(function (data) {
        // Make data available in the scope
        $scope.links = data;
        // Turn off loading animation
        $scope.portalHelpers.toggleLoading(false);
        // Show main view
        $scope.portalHelpers.showView('main.html', 1);
    });

    // OPEN API EXAMPLE
    $scope.portalHelpers.invokeServerFunction('getOpenData').then(function (result) {
        $scope.openDataExampleData = result;
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