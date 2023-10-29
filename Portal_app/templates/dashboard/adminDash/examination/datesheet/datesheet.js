myApp.controller("datesheetController", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    $scope.todaysDate = formattedDate;

    mapping = () => {
      httpService
        .get("eduexam/get_exam_mapping/")
        .then((r) => {
          get_exam_mapping = r.data;
          if (get_exam_mapping) {
            $scope.get_exam_mapping = get_exam_mapping;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    mapping();

    httpService
      .get("educore/courses")
      .then((r) => {
        courses = r.data;

        if (courses) {
          $scope.courses = courses;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.getdept = (course) => {
      $scope.getCourse = course;
      httpService
        .get("educore/departments/", { id: course.id })
        .then((r) => {
          departments = r.data;
          if (departments) {
            $scope.departments = departments;
          }
        })
        .catch((e) => {
          console.log(e);
        });

      httpService
        .get("educore/years/", { course_id: course.id })
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

    $scope.clickexam = (exam) => {
      $scope.exam = exam;
      httpService
        .get("eduexam/show_exam_type/")
        .then((r) => {
          var exams = r.data;
          if (exams) {
            $scope.exams = exams;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.getEndDate = (endDate) => {
      $scope.endDate = endDate;
    };

    $scope.getStartDate = (startDate) => {
      $scope.startDate = startDate;
    };

    $scope.submitted = () => {
      var date = new Date($scope.date);

      var formatDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      $scope.startD = formatDate;

      var examDates = new Date($scope.examDates);
      var formatted =
        examDates.getFullYear() +
        "-" +
        (examDates.getMonth() + 1) +
        "-" +
        examDates.getDate();

      if (!$scope.getCourse) {
        alertify.error("Please select course");
        return;
      }
      if (!$scope.year) {
        alertify.error("Please select year");
        return;
      }
      if (!$scope.exam) {
        alertify.error("Please select examtype");
        return;
      }
      if (!$scope.date) {
        alertify.error("Please select startdate");
        return;
      }
      if (!$scope.examDates) {
        alertify.error("Please select enddate");
        return;
      }

      var sendData = {
        exam_mapping_id: $scope.exam,
        course_dept_id: $scope.getCourse.id,
        year: $scope.year,
        start_date: formatDate,
        end_date: formatted,
      };

      httpService
        .post("eduexam/conduct_datesheet/", sendData)
        .then((r) => {
          console.log(r.data);
          alertify.success(r.data.message);
          mapping();
        })
        .catch((e) => {
          alertify.set("notifier", "position", "bottom-right");
          alertify.error(r.data.message);
          console.log(e);
        });
    };
  },
]);
