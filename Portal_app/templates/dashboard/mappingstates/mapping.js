myApp.controller("mappingController", [
    "$scope",
    "httpService",
    "$state",
    function ($scope, httpService, $state) {
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
            // httpService
            //   .get("educore/years/", { course_id: course })
            //   .then((response) => {
            //     years = response.data;
      
            //     if (years) {
            //       $scope.years = years;
            //     }
      
            //     console.log($scope.years);
            //   })
            //   .catch((error) => {
            //     console.log(error);
            //   });
          };
    }
])