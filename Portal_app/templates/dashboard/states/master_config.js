myApp.controller("masterController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    display = () => {
      showLoader();

      httpService
        .get("educore/courses/")
        .then((response) => {
          options = response.data;

          if (options) {
            $scope.options = options;
          }

          console.log($scope.options);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    display();
  },
]);
