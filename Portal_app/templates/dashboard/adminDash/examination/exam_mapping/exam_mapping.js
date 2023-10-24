myApp.controller("examMappingController", [
    "$scope",
    "httpService",
    function ($scope, httpService) {
        mapped = () => {
          
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
    }
    mapped();
      httpService
          .get("educore/examtype")
          .then((r) => {
            console.log(r);
            examtype=r.data;
            if(examtype){
              $scope.examtype=examtype
            }
          })
          .catch((e) => {
            console.log(e);
          });
          httpService
          .get("educore/duration")
          .then((r) => {
            console.log(r);
            duration=r.data;
            if(duration){
                $scope.duration=duration
            }
          })
          .catch((e) => {
            console.log(e);
          });
          httpService
          .get("educore/marks")
          .then((r) => {
            console.log(r);
            marks=r.data;
            if(marks){
                $scope.marks=marks
            }
          })
          .catch((e) => {
            console.log(e);
          });

          $scope.date=$scope.exam
    $scope.mapping = ()=>{
            var sendData={
                exam_type_id:$scope.selectedexamtype,
                duration:$scope.selectedDuration,
                marks:$scope.selectedmarks
            }
            console.log(sendData)
            httpService
            .post("eduexam/exam_mapping/",(sendData))
            .then((r) => {
                console.log(r);
                exam_mapping=r.data;
                if(exam_mapping){
                    $scope.exam_mapping=exam_mapping;
                }
               
                alertify.set("notifier", "position", "top-right");
                alertify.success(r.data.message);
            })
            .catch((e) => {
                alertify.set("notifier", "position", "bottom-right");
          console.log(e);
          alertify.error(e.data.message);
              });
          }
          mapped();
    },
  ]);
  