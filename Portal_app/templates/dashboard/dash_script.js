myApp.controller("dbController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    httpService
      .get("educore/loggedin/")
      .then((r) => {
        $scope.user_name = r.data.user_name;
        console.log( $scope.user_name)
        $scope.letter = $scope.user_name.charAt(0).toUpperCase();
      })
      .catch((e) => {
        console.log(e);
      });

    display = () => {
      showLoader();
      httpService
        .get("educore/sidebar/")
        .then((r) => {
          panelData = r.data;

          if (panelData) {
            $scope.panelData = panelData;
          }

          console.log($scope.panelData);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    display();

    $scope.stateChange = function (stateName) {
      $state.go(stateName);
    };

    $scope.logout = function () {
      showLoader();
      httpService
        .get("eduadmin/logout/")
        .then((r) => {
          $state.go("login");
          console.log(r);
          alertify.success("logged out succesfully!!");
        })
        .catch((e) => {
          console.log(e);
        });
    };
  },
]);
