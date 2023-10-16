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
        firstname: $scope.Firstname,
        lastname: $scope.lastname,
        username: $scope.username,
        email: $scope.email,
        age: $scope.age,
        address: $scope.address,
        phone: $scope.phone,
        fathername: $scope.fathername,
        mothername: $scope.fathername,
        pass: pass,
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

    $scope.courses = [];
    $scope.departments = [];

    httpService
      .get("courses/")
      .then((response) => {
        courses = response.data;

        if (courses) {
          $scope.courses = courses;
        }

        console.log(courses);
      })
      .catch((error) => {
        console.log(error);
      });

    $scope.selctedCourse = (course) => {
      httpService
        .get("departments/", { course_id: course })
        .then((response) => {
          departments = response.data;

          if (departments) {
            $scope.departments = departments;
          }

          console.log($scope.departments);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  },
]);
