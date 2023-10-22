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
        username: $scope.username,
        email: $scope.email,
        age: $scope.age,
        address: $scope.address,
        contact: $scope.phone,
        father_name: $scope.fathername,
        mother_name: $scope.mothername,
        course: $scope.selectedcourse,
        department: $scope.selectedDepartment,
        year: $scope.selectedYear,
        gender:$scope.selectedGender,
        religion:$scope.selectedReligion,
      };

      console.log(sendData);

      httpService
        .post("eduadmin/register_student/", sendData,{
        headers: { 'Content-Type': undefined },
        withCredentials: true})
        .then((response) => {
          alertify.success(response.data.message);
          var register = response.data;
          console.log(register);
         
        })
        .catch((error) => {
          console.log(error);
          alertify.error(error.data.message);
        });
    };

    $scope.courses = [];
    $scope.departments = [];
    $scope.years = [];
    httpService
      .get("educore/courses")
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
      httpService
      .get("educore/religion")
      .then((response) => {
        religions = response.data;

        if (religions) {
          $scope.religions = religions;
        }

        console.log(religions);
      })
      .catch((error) => {
        console.log(error);
      });
      httpService
      .get("educore/gender")
      .then((response) => {
        genders = response.data;

        if (genders) {
          $scope.genders = genders;
        }

        console.log(genders);
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
    
    

  },
]);