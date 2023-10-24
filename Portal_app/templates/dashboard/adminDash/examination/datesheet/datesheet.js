myApp.controller("datesheetController", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    $scope.todaysDate = formattedDate;

    httpService
      .get("eduexam/course_dept_mapping/")
      .then((r) => {
        courses = r.data;

        if (courses) {
          $scope.courses = courses;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    httpService
      .get("", { id: exam })
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.getCourses = (course) => {
      $scope.selectedCourse = course;

      httpService
        .get("educore/get_years/", { dept_mapped_id: course })
        .then((r) => {
          years = r.data;

          if (years) {
            $scope.years = years;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };
  },
]);
