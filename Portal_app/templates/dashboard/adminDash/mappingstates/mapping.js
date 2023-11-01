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
      $scope.selctedCourse = course;
      httpService
        .get("educore/departments/", { course_id: course.id })
        .then((response) => {
          departments = response.data;

          if (departments) {
            $scope.departments = departments;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
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
      var sendData = {
        department_id: depart.id,
        course_id: $scope.selctedCourse.id,
      };
      httpService
        .post("educore/assign_department_to_course/", sendData)
        .then((r) => {
          $scope.getDept($scope.selctedCourse);
          alertify.set("notifier", "position", "top-right");
          alertify.success(r.data.message);
        })
        .catch((e) => {
          alertify.set("notifier", "position", "bottom-right");
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.openYearModal = (department) => {
      $scope.seldepartment = department;
      $scope.selectedYear = ""
      httpService
        .get("educore/get_years/", { dept_mapped_id: department.id })
        .then((response) => {
          years = response.data;

          if (years) {
            $scope.years = years;
          }
        })
        .catch((error) => {
          console.log(error);
        });

      $scope.selctedYear = (year) => {
        $scope.selectedYear = year;
        $scope.subjects = "";
        $scope.teachs = "";
        httpService
          .get("educore/get_subjects/", {
            year: year,
            mapped_sub: $scope.seldepartment.id,
          })
          .then((response) => {
            subjects = response.data;
            if (subjects) {
              $scope.subjects = subjects;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      $scope.Sub = (subj) => {
        var sendData = {
          subject_id: subj.id,
          year: $scope.selectedYear,
          department_id: $scope.seldepartment.id,
        };
        httpService
          .post("educore/subject_mapping/", sendData)
          .then((r) => {
            $scope.selctedYear($scope.selectedYear);
            alertify.set("notifier", "position", "top-right");
            alertify.success(r.data.message);
          })
          .catch((e) => {
            alertify.set("notifier", "position", "bottom-right");
            console.log(e);
            alertify.error(e.data.message);
          });
      };

      $scope.getTeacher = (subject) => {
        $scope.ngsubject = subject;
        httpService
          .get("educore/mapped_faculty/", { id: subject.id })
          .then((r) => {
            teachs = r.data;

            if (teachers) {
              $scope.teachs = teachs;
            }
          })
          .catch((e) => {
            alertify.set("notifier", "position", "bottom-right");
            console.log(e);
            alertify.error(e.data.message);
          });
      };

      $scope.Tech = (teacher) => {
        var sendData = {
          faculty_id: teacher.id,
          sub_mapping_id: $scope.ngsubject.id,
        };
        httpService
          .post("educore/subject_teacher_mapping/", sendData)
          .then((r) => {
            $scope.getTeacher($scope.ngsubject);
            alertify.set("notifier", "position", "top-right");
            alertify.success(r.data.message);
          })
          .catch((e) => {
            alertify.set("notifier", "position", "bottom-right");
            console.log(e);
            alertify.error(e.data.message);
          });
      };
      $scope.selectedyear = "";
    };

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

    $scope.closeModal = (modalId) => {
      hideModal(modalId);
      $scope.selectedyear = "";
      $scope.subjects = "";
      $scope.teachs = "";
      $scope.ngsubject = "";
    };
  },
]);
