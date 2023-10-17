myApp.controller("dbController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    display = () => {
      // showLoader();
      httpService
        .get("educore/sidebar/")
        .then((response) => {
          panelData = response.data;

          if (panelData) {
            $scope.panelData = panelData;
          }

          console.log($scope.panelData);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    display();

    $scope.stateChange = function (stateName) {
      $state.go(stateName);
      console.log(stateName)
    };

    $scope.logout = function () {
      // showLoader();
      httpService
        .get("eduadmin/logout/")
        .then((response) => {
          $state.go("login");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  },
]);
