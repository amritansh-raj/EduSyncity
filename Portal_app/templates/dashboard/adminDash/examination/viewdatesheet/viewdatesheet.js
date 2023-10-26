myApp.controller("viewdatesheetContoller", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    $scope.options = []
    $scope.choose = [];
    $scope.unique = []; 
    $scope.unique_id=[]
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
        .get("eduexam/selectdept/", { id: course.course_id__id })
        .then((r) => {
          console.log(r);
          get = r.data;
          if (get) {
            $scope.get = get;
          }
        })
        .catch((e) => {
          console.log(e);
        });}
    $scope.Dept = (option) => {
      console.log(option.id)
      $scope.option = option
      $scope.options.push(
        $scope.option,
      );
      main=[];
      main=$scope.options;
      function removeDuplicates(main) { 
       
        main.forEach(element => { 
            if (!$scope.unique.includes(element)) { 
                $scope.unique.push(element); 
            } 
        }); 
        return $scope.unique; 
    } 
    console.log($scope.unique)
    console.log(removeDuplicates(main));
      $scope.choose.push(
        $scope.option.id,
      );
      
      console.log($scope.choice);
      console.log($scope.choose);
    }

    $scope.list = () => {
      
    console.log($scope.choose)
      id=$scope.choose.join(',');
      httpService
     
        .get("eduexam/select_sub/", { id: id,year: $scope.getCourse.year })
        .then((response) => {
          subjects= response.data;

          if (subjects) {
            $scope.subjects = subjects;
          }

          console.log($scope.subjects);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
]);