myApp.controller("masterController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    display = () => {
      showLoader();

      httpService
        .get("")
        .then((response) => {
          options = response.data;

          if (options) {
            $scope.options = options;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          hideLoader();
        });
    };

    display();
  },
]);
