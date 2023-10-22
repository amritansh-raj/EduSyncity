myApp.controller("masterController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    display = () => {
      showLoader();

      httpService
        .get("educore/get_parents/")
        .then((r) => {
          options = r.data;

          if (options) {
            $scope.options = options;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.getChild = (id) => {
      $scope.parentId = id;
      console.log($scope.parentId);
      showLoader();
      httpService
        .get("educore/get_childs/", { parent_id: id })
        .then((r) => {
          childs = r.data;

          if (childs) {
            $scope.childs = childs;
          }

          console.log($scope.childs);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    display();

    $scope.toggleParentForm = () => {
      $scope.showParentForm = !$scope.showParentForm;
    };

    $scope.toggleAddChild = () => {
      if ($scope.childs) {
        $scope.adding = !$scope.adding;
      } else {
        alertify.error("Please select a parent from drowpdown above");
      }
    };

    $scope.toggleAddParent = () => {
      $scope.addParent = !$scope.addParent;
    };

    $scope.addParent = () => {
      data = {
        name: $scope.parent,
        child: $scope.depth,
      };

      httpService
        .post("educore/parents/", data)
        .then((r) => {
          console.log(r);
          alertify.success(r.data.message);
          display();
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.addChild = () => {
      var childName = document.querySelector("input[name=child]").value;
      var editOn = document.querySelector(
        "input[ng-model='myCheckbox.val1']"
      ).value;
      var deleteOn = document.querySelector(
        "input[ng-model='myCheckbox.val2']"
      ).value;
      console.log(editOn);
      console.log(deleteOn);
      httpService
        .post("eduadmin/child/", {
          id: $scope.parentId,
          name: childName,
          delete: deleteOn,
          edit: editOn,
        })
        .then((r) => {
          $scope.getChild($scope.parentId);
          $scope.adding = false;
          console.log(r);
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.openModal = (child) => {
      console.log(child);
      $scope.selectedChild = child;
    };

    $scope.openParentModal = (parent) => {
      $scope.selectedParent = parent;
    };

    $scope.edit = () => {
      $scope.editing = true;
      document.getElementById("addInputField").removeAttribute("disabled");
    };

    $scope.editParent = () => {
      $scope.toggleAddParent();
      document.getElementById("parentName").removeAttribute("disabled");
    };

    $scope.cancelEditParent = () => {
      $scope.toggleAddParent();
      document.getElementById("parentName").setAttribute("disabled", "");
    };

    $scope.notEditing = () => {
      $scope.editing = false;
      document.getElementById("addInputField").setAttribute("disabled", "");
    };

    $scope.save = (selectedChild) => {
      showLoader();

      childData = {
        id: selectedChild.id,
        new_name: $scope.childName,
      };

      httpService
        .put("eduadmin/child/", childData)
        .then((r) => {
          console.log(r);
          $scope.getChild($scope.parentId);
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.saveParent = (selectedParent) => {
      showLoader();

      parentData = {
        id: selectedParent.id,
        name: selectedParent.name,
      };

      httpService
        .put("eduadmin/child/", parentData)
        .then((r) => {
          console.log(r);
          display();
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.delete = (selectedChild, modalId) => {
      showLoader();

      httpService
        .delete("eduadmin/child/", { id: selectedChild.id })
        .then((r) => {
          console.log(r);
          $scope.getChild($scope.parentId);
          hideModal(String(modalId));
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.delParent = (selectedParent, modalId) => {
      showLoader();

      httpService
        .put("eduadmin/child/", parentData)
        .then((r) => {
          console.log(r);
          display();
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };
  },
]);
