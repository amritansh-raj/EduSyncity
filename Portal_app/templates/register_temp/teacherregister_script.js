myApp.controller("teacherregisterController", [
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
        qualification:$scope.qualification,
        id: $scope.selectedYear,
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
        });
    };

    $scope.courses = [];
    $scope.departments = [];
    $scope.years = [];
    httpService
      .get("educore/courses/")
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
        .get("educore/departments/", { course_id: course })
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
        httpService
        .get("educore/years/", { course_id: course })
        .then((response) => {
          years = response.data;

          if (years) {
            $scope.years = years;
          }

          console.log($scope.years);
        })
        .catch((error) => {
          console.log(error);
        });
        
    };
    
    $scope.selctedYear = (year) => {
      httpService
        .get("educore/subjects/", { year_id: year },{ department_id: department },{ course_id: course})
        .then((response) => {
          subjects = response.data;

          if (subjects) {
            $scope.subjects = subjects;
          }

          console.log($scope.subjects);
        })
        .catch((error) => {
          console.log(error);
        });
    };

  },
]);