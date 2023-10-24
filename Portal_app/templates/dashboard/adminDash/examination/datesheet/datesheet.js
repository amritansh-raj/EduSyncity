myApp.controller("datesheetController", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    $scope.todaysDate = formattedDate;
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
      console.log(course)
      console.log($scope.getCourse)
      httpService
        .get("educore/departments/", { id: course.id })
        .then((r) => {
          console.log(r);
          departments = r.data;
          if (departments) {
            $scope.departments = departments;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };


    $scope.getdepartment = (department) => {
      $scope.getDepartments = department;
      console.log(department)
      httpService
        .get("educore/get_years/", { dept_mapped_id: department.id })
        .then((r) => {
          console.log(r);
          years = r.data;
          if (years) {
            $scope.years = years;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    $scope.clickexam = (exam) => {
      $scope.exam = exam;
      console.log(exam)
      httpService
        .get("educore/examtype")
        .then((r) => {
          console.log(r);
          exams = r.data;
          if (exams) {
            $scope.exams = exams;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    // var start = document.getElementById('start');
    // var end = document.getElementById('end');

    // start.addEventListener('change', function() {
    //   if (start.value)
    //     end.min = start.value;
    // }, false);
    // end.addEventLiseter('change', function() {
    //   if (end.value)
    //     start.max = end.value;
    // }, false);
    // start.addEventListener('input', function(e){
    //   var day = new Date(this.value).getUTCDay();
    //   if([6,0].includes(day)){
    //     e.preventDefault();
    //     this.value = '';
    //     alert('Weekends not allowed');
    //   }
    // });
    // end.addEventListener('input', function(e){
    //   var day = new Date(this.value).getUTCDay();
    //   if([6,0].includes(day)){
    //     e.preventDefault();
    //     this.value = '';
    //     alert('Weekends not allowed');
    //   }
    // });
    

    $scope.submitted = () => {
      var date = new Date($scope.date);
    var formattedDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      console.log(formattedDate)
      var examDates = new Date($scope.examDates);
      var formatted =
      examDates.getFullYear() + "-" + (examDates.getMonth() + 1) + "-" + examDates.getDate();
        console.log(formatted)
      var sendData = {
        exam_mapping_id: $scope.exam ,
        course_dept_id: $scope.getDepartments.id,
        year: $scope.year,
        start_date:formattedDate,
        end_date: formatted,
      }
      console.log(sendData);
      httpService
        .post("eduexam/conduct_datesheet/", sendData)
        .then((r) => {
          console.log(r.data)
        })
        .catch((e) => {
          alertify.set("notifier", "position", "bottom-right");
          console.log(e);

        });
    }

  },
]);
