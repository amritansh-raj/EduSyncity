myApp.controller("studentregisterController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    $scope.register = function () {
      showLoader();
      var sendData = {
        first_name: $scope.Firstname,
        last_name: $scope.lastname,
        user_name: $scope.username,
        email: $scope.email,
        age: $scope.age,
        address: $scope.address,
        contact: $scope.phone,
        father_name: $scope.fathername,
        mother_name: $scope.mothername,
        course: $scope.selectedcourse,
        department: $scope.selectedDepartment,
        year: $scope.selectedYear,
        gender: $scope.selectedGender,
        religion: $scope.selectedReligion,
      };

      console.log(sendData);

      httpService
        .post("eduadmin/register_student/", sendData, {
          headers: { "Content-Type": undefined },
          withCredentials: true,
        })
        .then((r) => {
          alertify.success(r.data.message);
          var register = r.data;
          console.log(register);
        })
        .catch((e) => {
          alertify.error(e.data.message);
          console.log(e);
        });
    };

    $scope.courses = [];
    $scope.departments = [];
    $scope.years = [];
    httpService
      .get("educore/courses/")
      .then((r) => {
        courses = r.data;

        if (courses) {
          $scope.courses = courses;
        }

        console.log(courses);
      })
      .catch((e) => {
        console.log(e);
      });
    httpService
      .get("educore/religion/")
      .then((r) => {
        religions = r.data;

        if (religions) {
          $scope.religions = religions;
        }

        console.log(religions);
      })
      .catch((e) => {
        console.log(e);
      });
    httpService
      .get("educore/gender/")
      .then((r) => {
        genders = r.data;

        if (genders) {
          $scope.genders = genders;
        }

        console.log(genders);
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.selctedCourse = (course) => {
      httpService
        .get("educore/departments/", { course_id: course })
        .then((r) => {
          departments = r.data;

          if (departments) {
            $scope.departments = departments;
          }

          console.log($scope.departments);
        })
        .catch((e) => {
          console.log(e);
        });
      httpService
        .get("educore/years/", { course_id: course })
        .then((r) => {
          years = r.data;

          if (years) {
            $scope.years = years;
          }

          console.log($scope.years);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  },
]);
