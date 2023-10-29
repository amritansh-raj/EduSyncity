myApp.controller("examMappingController", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    map = () => {
      httpService
        .get("eduexam/all_exam_mapping/")
        .then((r) => {
          mapped = r.data;

          if (mapped) {
            $scope.mapped = mapped;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    map();

    httpService
      .get("educore/examtype")
      .then((r) => {
        examtype = r.data;
        if (examtype) {
          $scope.examtype = examtype;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    httpService
      .get("educore/duration")
      .then((r) => {
        duration = r.data;
        if (duration) {
          $scope.duration = duration;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    httpService
      .get("educore/marks")
      .then((r) => {
        marks = r.data;
        if (marks) {
          $scope.marks = marks;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.date = $scope.exam;

    $scope.mapping = () => {
      if (!$scope.selectedexamtype) {
        alertify.error("Please select exam type");
        return;
      } else if (!$scope.selectedDuration) {
        alertify.error("Please select duration");
        return;
      } else if (!$scope.selectedmarks) {
        alertify.error("Please select marks");
        return;
      }

      var sendData = {
        exam_type_id: $scope.selectedexamtype,
        duration: $scope.selectedDuration,
        marks: $scope.selectedmarks,
      };

      httpService
        .post("eduexam/exam_mapping/", sendData)
        .then((r) => {
          exam_mapping = r.data;
          if (exam_mapping) {
            $scope.exam_mapping = exam_mapping;
          }
          alertify.set("notifier", "position", "top-right");
          alertify.success(r.data.message);
          map();
        })
        .catch((e) => {
          alertify.set("notifier", "position", "bottom-right");
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.del = (selectedMap) => {
      $scope.selectedMap = selectedMap;

      httpService
        .delete("eduexam/exam_mapping/", { id: selectedMap.id })
        .then((r) => {
          alertify.success(r.data.message);
          map();
        })
        .catch((e) => {
          console.log(e.data);
        });
    };

    $scope.editModal = (selectedOption, modalId) => {
      $scope.selectedOption = selectedOption;
      $scope.editmarksOption = $scope.marks;
      $scope.editdurationOption = $scope.duration;

      showModal(String(modalId));
    };

    $scope.edit = (modalId) => {
      if (!$scope.editDuration) {
        alertify.error("Please select duration");
        return;
      } else if (!$scope.editMarks) {
        alertify.error("Please select marks");
        return;
      }

      editData = {
        id: $scope.selectedOption.id,
        duration: $scope.editDuration,
        marks: $scope.editMarks,
      };

      httpService
        .put("eduexam/exam_mapping/", editData)
        .then((r) => {
          hideModal(String(modalId));
          map();
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e.data);
          alertify.error(e.data.message);
        });
    };
  },
]);
