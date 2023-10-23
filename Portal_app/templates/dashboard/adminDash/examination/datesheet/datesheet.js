myApp.controller("datesheetController", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    $scope.todaysDate = formattedDate;

    httpService
      .get("eduexam/department_course/")
      .then((r) => {
        courses = r.data;

        if (courses) {
          $scope.courses = courses;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.getCourses = (course) => {
      $scope.selectedCourse = course;

      httpService
        .get("", { id: course })
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.getYear = (year) => {
      $scope.selectedYear = year;

      httpService
        .get("", { id: year })
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.getExam = (exam) => {
      $scope.selectedExam = exam;

      httpService
        .get("", { id: exam })
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  },
]);
