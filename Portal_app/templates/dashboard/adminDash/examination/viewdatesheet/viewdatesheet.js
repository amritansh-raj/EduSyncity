myApp.controller("viewdatesheetContoller", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    // $scope.options = []
    // $scope.choose = [];
    // $scope.unique = []; 
    // $scope.unique_id=[]
    mapping = () => {
      httpService
        .get("eduexam/get_exam_mapping/")
        .then((r) => {
          console.log(r);
          get_exam_mapping = r.data;
          if (get_exam_mapping) {
            $scope.get_exam_mapping = get_exam_mapping;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    
    mapping();
    $scope.getdept = (course) => {
      $scope.getCourse = course;
      console.log(course)
      console.log($scope.getCourse)
      httpService
        .get("eduexam/select_sub/", { id: course.course_id__id,year: $scope.getCourse.year })
        .then((r) => {
          console.log(r);
          get = r.data;
          if (get) {
            $scope.get = get;
            $scope.main=[]
           console.log($scope.get.length)
           $scope.gets=$scope.get.flat();
           console.log( $scope.gets)
          
          }
        })
        .catch((e) => {
          console.log(e);
        }
        );
        httpService
        .get("eduexam/get_date/",{id: $scope.getCourse.id})
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
      }
        // $scope.getdept = (course) => {
        //   $scope.getCourse = course;
        // httpService
        // .get("eduexam/get_date/",{id: $scope.getCourse.course_id__id})
        // .then((r) => {
        //   console.log(r);
        //   dates = r.data;
        //   if (dates) {
        //     $scope.dates = dates;
        //   }
        // })
        // .catch((e) => {
        //   console.log(e);
        // });}
    // $scope.Dept = (option) => {
    //   console.log(option.id)
    //   $scope.option = option
    //   $scope.options.push(
    //     $scope.option,
    //   );
    //   main=[];
    //   main=$scope.options;
    //   function removeDuplicates(main) { 
       
    //     main.forEach(element => { 
    //         if (!$scope.unique.includes(element)) { 
    //             $scope.unique.push(element); 
    //         } 
    //     }); 
    //     return $scope.unique; 
    // } 
    // console.log($scope.unique)
    // console.log(removeDuplicates(main));
    //   $scope.choose.push(
    //     $scope.option.id,
    //   );
      
    //   console.log($scope.choice);
    //   console.log($scope.choose);
    // }

    // $scope.Dept = (subject) => {
    //   console.log(subject.id)
    //   // id=$scope.choose.join(',');
    //   httpService
     
    //     .get("eduexam/select_sub/", {id: id,year: $scope.getCourse.year })
    //     .then((response) => {
    //       subjects= response.data;

    //       if (subjects) {
    //         $scope.subjects = subjects;
    //       }
    //       console.log($scope.subjects);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
   

    httpService
    .get("educore/shift")
    .then((r) => {
      console.log(r);
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
      console.log(shift)
      console.log($scope.getShift)
      httpService
        .get("eduexam/get_shift_time/", { id: shift.id})
        .then((r) => {
          console.log(r);
          times = r.data;
          if (times) {
            $scope.times = times;
          }
        })
        .catch((e) => {
          console.log(e);
        });}

        $scope.datesheet = ()=>{
          var sendData={
              course_id:$scope.getCourse.id,
              shift:$scope.getShift.id,
             subject:$scope.choice,
             date:$scope.date,
             time:$scope.time,

          }
          console.log(sendData)
          httpService
          .post("eduexam/datesheet/",(sendData))
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

  },
]);