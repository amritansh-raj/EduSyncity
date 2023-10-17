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

    $scope.getChild = (id) => {
      httpService.get("", { params: id }).then((response) => {
        childs = response.data;

        if (childs) {
          $scope.childs = childs;
        }

        console.log($scope.childs);
      });
    };
    display();

    $scope.showInput = () => {
      $scope.adding = true;
    };

    $scope.addChild = () => {
      var child = document.querySelector('input[name=child]').value;
      console.log(child);
      
      $scope.adding = false;
    };
  },
]);
