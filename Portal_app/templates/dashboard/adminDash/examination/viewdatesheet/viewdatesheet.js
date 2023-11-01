myApp.controller("viewdatesheetContoller", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    $scope.gets = [];
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
            $scope.gets = $scope.get.flat();
          }
          $scope.shift='';
          $scope.time='';
          $scope.choice='';

        })
        .catch((e) => {
          console.log(e);
        });

      httpService
        .get("eduexam/get_date/", { id: $scope.getCourse.id })
        .then((r) => {
          dates = r.data;
          if (dates) {
            $scope.dates = dates;
            
          }
        
        })
        .catch((e) => {
          console.log(e);
        });

      getDatesheet = () => {
        httpService
          .get("eduexam/get_datesheet/", { id: $scope.getCourse.id })
          .then((r) => {
            console.log(r);
            $scope.mapped = r.data;
           
            // if (mapped) {
            //   $scope.mapped = mapped;
            // }
          })
          .catch((e) => {
            console.log(e);
          });
      }
      getDatesheet();
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
      httpService
        .get("eduexam/get_shift_time/", { id: shift.id })
        .then((r) => {
          times = r.data;
          if (times) {
            $scope.times = times;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.Sub = (dept_id) => {
      $scope.dept_id = dept_id.department_id;
      console.log(dept_id.department_id);
      $scope.date='';
      $scope.time='';
      $scope.shift='';
    };

    $scope.datesheet = () => {
      var sendData = {
        course_id: $scope.getCourse.id,
        shift: $scope.getShift.id,
        subject: $scope.choice,
        date: $scope.date,
        time: $scope.time,
        mapping_id: $scope.dept_id,
      };

      httpService
        .post("eduexam/datesheet/", sendData)
        .then((r) => {
          exam_mapping = r.data;

          if (exam_mapping) {
            $scope.exam_mapping = exam_mapping;
          }

          alertify.set("notifier", "position", "top-right");
          alertify.success(r.data.message);
          getDatesheet();
        })
        .catch((e) => {
          alertify.set("notifier", "position", "bottom-right");
          console.log(e);
          alertify.error(e.data.message);
        });

    };
    $scope.submit = () => {
      var send = {
        id: $scope.getCourse.id,
      }
      console.log(send)
      httpService
        .post("eduexam/publish_datesheet/", send)
        .then((r) => {
          submission = r.data;
          alertify.set("notifier", "position", "top-right");
          alertify.success(r.data.message);
        })
        .catch((e) => {
          alertify.set("notifier", "position", "bottom-right");
          console.log(e);
          alertify.error(e.data.message);
        });

    }
  },
]);
