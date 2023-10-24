myApp.controller("mappingController", [
  "$scope",
  "httpService",
  "$state",
  "$window",
  function ($scope, httpService, $state, $window) {
    showLoader();

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

    $scope.getDept = (course) => {
      $scope.selctedCourse = course
      console.log($scope.selctedCourse)
      httpService
        .get("educore/departments/", { id: course.id })
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
    }
    httpService
      .get("educore/get_departments/")
      .then((r) => {
        departs = r.data;
        if (departs) {
          $scope.departs = departs;
        }
      })
      .catch((e) => {
        console.log(e);
      });


    $scope.Dept = (depart) => {
      console.log(depart.id)
      var sendData = {
        department_id: depart.id,
        course_id: $scope.selctedCourse.id
      }
      console.log(sendData)
      httpService
        .post("educore/assign_department_to_course/", sendData)
        .then((r) => {
          console.log(r.data);
          $scope.getDept($scope.selctedCourse)
          alertify.set("notifier", "position", "top-right");
          alertify.success(r.data.message);
        })
        .catch((e) => {
          alertify.set("notifier", "position", "bottom-right");
          console.log(e);
          alertify.error(e.data.message);

        });
    }
    $scope.openYearModal = (department) => {
      $scope.seldepartment = department
      console.log($scope.seldepartment)
      httpService
        .get("educore/get_years/", { dept_mapped_id: department.id })
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
        $scope.selctedYear = (year) => {

          $scope.selectedYear = year
          httpService
            .get("educore/get_subjects/", { year: year, mapped_sub: $scope.seldepartment.id })
            .then((response) => {
              subjects = response.data;
              if (subjects) {
                $scope.subjects = subjects;
              }
              console.log($scope.subjects);
            })
            .catch((error) => {
              console.log(error);
            });
        };
        $scope.Sub = (subj) => {
          console.log(subj.id)
          var sendData = {
            subject_id: subj.id,
            year: $scope.selectedYear,
            department_id: $scope.seldepartment.id,
          }
          console.log(sendData)
          httpService
            .post("educore/subject_mapping/", sendData)
            .then((r) => {
              console.log(r.data);
              $scope.selctedYear( $scope.selectedYear)
              alertify.set("notifier", "position", "top-right");
              alertify.success(r.data.message);
            })
            .catch((e) => {
              alertify.set("notifier", "position", "bottom-right");
              console.log(e);
              alertify.error(e.data.message);
    
            });
        }
        $scope.getTeacher = (subject) => {
          $scope.ngsubject = subject
          console.log($scope.ngsubject)
          httpService
            .get("educore/mapped_faculty/", { id: subject.id })
            .then((r) => {
              teachs = r.data;
    
              if (teachers) {
                $scope.teachs = teachs;
              }
    
              console.log($scope.teachs);
            })
            .catch((e) => {
             alertify.set("notifier", "position", "bottom-right");
              console.log(e);
              alertify.error(e.data.message);
            });
        }
        $scope.Tech = (teacher) => {
          console.log($scope.ngsubject.id)
          console.log(teacher.id)
          var sendData = {
            faculty_id: teacher.id,
            sub_mapping_id: $scope.ngsubject.id
          }
          console.log(sendData)
          httpService
            .post("educore/subject_teacher_mapping/", sendData)
            .then((r) => {
              console.log(r.data);
              $scope.getTeacher( $scope.ngsubject)
              alertify.set("notifier", "position", "top-right");
              alertify.success(r.data.message);
            })
            .catch((e) => {
              alertify.set("notifier", "position", "bottom-right");
              console.log(e);
              alertify.error(e.data.message);
    
            });
        }
    }
    
    httpService
      .get("educore/subjects/")
      .then((r) => {
        subjs = r.data;
        if (subjs) {
          $scope.subjs = subjs;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    httpService
      .get("educore/faculty/")
      .then((r) => {
        teachers = r.data;
        if (teachers) {
          $scope.teachers = teachers;
        }
      })
      .catch((e) => {
        console.log(e);
      });

   
   
   

  }
])