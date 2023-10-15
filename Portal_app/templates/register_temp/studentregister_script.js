myApp.controller("studentregisterController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    $scope.register = function () {
      showLoader();
      pass = $scope.password;
      console.log(pass);

      if (!validatePass(pass)) {
        $scope.registerForm.password.$setValidity("password", false);
        hideLoader();
      } else {
        $scope.registerForm.password.$setValidity("password", true);
        hideLoader();
      }

      var sendData = {
        firstname : $scope.Firstname,
        lastname : $scope.lastname,
        username :$scope.username,
        email :$scope.email,
       age: $scope.age,
       address: $scope.address,
       phone: $scope.phone,
       fathername: $scope.fathername,
       mothername: $scope.fathername,
        pass : pass,
        id: $scope.selectedDepartment,
      };

      console.log(sendData);

      httpService
        .post("", sendData)
        .then((response) => {
          var register = response.data;
          console.log(register);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          hideLoader();
        });
    };

    $scope.coursess = [];
    $scope.departments = [];
    $scope.selectedcourses = null;

    $scope.loadDoctors = function () {
      if ($scope.selectedcourses) {
        httpService
          .get(" ", {
            params: { coursesid: $scope.selectedcourses },
          })
          .then((response) => {
            console.log(response);
            $scope.departments = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        $scope.departments = [];
      }
    };

    httpService
      .get(" ")
      .then((response) => {
        console.log(response);
        $scope.coursess = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
]);
