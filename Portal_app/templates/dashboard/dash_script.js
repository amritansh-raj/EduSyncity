myApp.controller("dbController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    $scope.logout = function () {
      // showLoader();
      httpService
        .get("logout/")
        .then((response) => {
          $state.go("login");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          hideLoader();
        });
    };

    display = () => {
      // showLoader();
      httpService
        .get("sidebar/")
        .then((response) => {
          panelData = response.data;

          if (panelData) {
            $scope.panelData = panelData;
          }

          console.log($scope.panelData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          hideLoader();
        });
    };

    display();

    $scope.stateChange = function (stateName) {
      $state.go(stateName);
      console.log(stateName)
    };
  },
]);
