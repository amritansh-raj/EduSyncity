myApp.controller("studentregisterController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    $scope.courses = [];
    $scope.departments = [];
    $scope.years = [];
    httpService
      .get("educore/courses")
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
      .get("educore/religion")
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
      .get("educore/gender")
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

    $scope.register = () => {
      showLoader();
      var sendData = {
        first_name: $scope.Firstname,
        last_name: $scope.lastname,
        username: $scope.username,
        email: $scope.email,
        age: $scope.age,
        address: $scope.address,
        contact: $scope.phone,
        father_name: $scope.fathername,
        mother_name: $scope.mothername,
        course: $scope.selectedcourse,
        department:$scope.selectedDepartment,
        year: $scope.selectedYear,
        gender: $scope.selectedGender,
        religion: $scope.selectedReligion,
      };

      if (!sendData.first_name) {
        alertify.error("Enter Firstname");
        hideLoader();
        return;
      } else if (!sendData.last_name) {
        alertify.error("Enter lastname");
        hideLoader();
        return;
      } else if (!sendData.father_name) {
        alertify.error("Enter father's name");
        hideLoader();
        return;
      } else if (!sendData.mother_name) {
        alertify.error("Enter mother's name");
        hideLoader();
        return;
      } else if (!sendData.username) {
        alertify.error("Enter username");
        hideLoader();
        return;
      } else if (!sendData.address) {
        alertify.error("Enter address");
        hideLoader();
        return;
      } else if (!sendData.course) {
        alertify.error("Enter course");
        hideLoader();
        return;
      } else if (!sendData.department) {
        alertify.error("Enter department");
        hideLoader();
        return;
      } else if (!sendData.year) {
        alertify.error("Enter year");
        hideLoader();
        return;
      } else if (!sendData.gender) {
        alertify.error("Enter gender");
        hideLoader();
        return;
      } else if (!sendData.religion) {
        alertify.error("Enter religion");
        hideLoader();
        return;
      }

      if (!validatePhoneNumber(sendData.contact)) {
        alertify.error("Invalid Phone number");
        hideLoader();
        return;
      }

      if (!validateEmail(sendData.email)) {
        alertify.error("Invalid Email");
        hideLoader();
        return;
      }

      httpService
        .post("eduadmin/register_student/", sendData)
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
  },
]);
