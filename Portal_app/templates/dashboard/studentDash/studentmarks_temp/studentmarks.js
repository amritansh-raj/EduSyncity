myApp.controller("studentmarksController", [
  "$scope",
  "$http",
  "httpService",
  function ($scope, $http, httpService) {
    httpService
      .get("eduexam/student_marks/")
      .then((r) => {
        console.log(r.data);
      })
      .catch((e) => {
        console.log(e.data);
      });
  },
]);
