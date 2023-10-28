myApp.controller("viewdatesheetContoller", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    $scope.gets = [];
    // $scope.choose = [];
    // $scope.unique = [];
    // $scope.unique_id=[]
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

    $scope.getdept = (course) => {
      $scope.getCourse = course;
      console.log(course);
      console.log($scope.getCourse);
      httpService
        .get("eduexam/select_sub/", {
          id: course.course_id__id,
          year: $scope.getCourse.year,
        })
        .then((r) => {
          get = r.data;
          if (get) {
            $scope.get = get;
            $scope.main = [];
            console.log($scope.get.length);
            $scope.gets = $scope.get.flat();
            console.log($scope.gets);
          }
        })
        .catch((e) => {
          console.log(e);
        });

      httpService
        .get("eduexam/get_date/", { id: $scope.getCourse.id })
        .then((r) => {
          console.log(r);
          dates = r.data;
          if (dates) {
            $scope.dates = dates;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    httpService
      .get("educore/shift")
      .then((r) => {
        shifts = r.data;
        if (shifts) {
          $scope.shifts = shifts;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.gettime = (shift) => {
      $scope.getShift = shift;
      console.log(shift);
      console.log($scope.getShift);
      httpService
        .get("eduexam/get_shift_time/", { id: shift.id })
        .then((r) => {
          console.log(r);
          times = r.data;
          if (times) {
            $scope.times = times;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.datesheet = () => {
      var sendData = {
        course_id: $scope.getCourse.id,
        shift: $scope.getShift.id,
        subject: $scope.choice,
        date: $scope.date,
        time: $scope.time,
      };
      
      httpService
        .post("eduexam/datesheet/", sendData)
        .then((r) => {
          console.log(r);
          exam_mapping = r.data;

          if (exam_mapping) {
            $scope.exam_mapping = exam_mapping;
          }

          alertify.set("notifier", "position", "top-right");
          alertify.success(r.data.message);
        })
        .catch((e) => {
          alertify.set("notifier", "position", "bottom-right");
          console.log(e);
          alertify.error(e.data.message);
        });
    };
  },
]);