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
          parents = r.data;

          if (parents) {
            $scope.parents = parents;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.getChild = (id) => {
      $scope.parentId = id;
      showLoader();
      httpService
        .get("educore/get_childs/", { parent_id: id })
        .then((r) => {
          childs = r.data;

          if (childs) {
            $scope.childs = childs;
          }
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
      $scope.showParent = !$scope.showParent;
    };

    $scope.editable = true;
    $scope.deleteable = true;

    $scope.addParent = () => {
      data = {
        name: $scope.parent,
        depth: $scope.depth,
        editable: $scope.editable,
        deletable: $scope.deleteable,
      };

      httpService
        .post("educore/parents/", data)
        .then((r) => {
          console.log(r);
          $scope.toggleParentForm();
          $scope.parent = "";
          $scope.depth = "";
          alertify.success(r.data.message);
          display();
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.addChild = () => {
      var childName = document.querySelector("input[name=child]").value;

      httpService
        .post("eduadmin/child/", {
          id: $scope.parentId,
          name: childName,
        })
        .then((r) => {
          $scope.getChild($scope.parentId);
          $scope.adding = false;
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

    $scope.editParent = (selectedParent) => {
      if (selectedParent.can_update) {
        $scope.toggleAddParent();
        document.getElementById("parentName").removeAttribute("disabled");
      } else {
        alertify.error("Cannot edit this parent");
      }
    };

    $scope.cancelEditParent = () => {
      $scope.toggleAddParent();
      document.getElementById("parentName").setAttribute("disabled", "");
    };

    $scope.notEditing = () => {
      $scope.editing = false;
      document.getElementById("addInputField").setAttribute("disabled", "");
    };

    $scope.editChild = (selectedChild, modalId) => {
      editData = {
        id: selectedChild.id,
        new_name: selectedChild.name,
      };

      httpService
        .put("eduadmin/child/", editData)
        .then((r) => {
          console.log(r.data);
          $scope.getChild($scope.parentId);
          $scope.notEditing();
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e.data);
          alertify.error(r.data.message);
        });
    };

    $scope.saveParent = (selectedParent) => {
      showLoader();

      parentData = {
        id: selectedParent.id,
        name: selectedParent.name,
      };

      httpService
        .put("educore/parents/", parentData)
        .then((r) => {
          console.log(r);
          display();
          $scope.cancelEditParent();
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.delete = (selectedChild, modalId) => {
      showLoader();

      if (selectedChild.can_delete) {
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
      } else {
        hideLoader();
        alertify.error("This child cannot be deleted");
      }
    };

    $scope.delParent = (selectedParent, modalId) => {
      showLoader();

      if (selectedParent.can_delete) {
        httpService
          .delete("educore/parents/", { id: selectedParent.id })
          .then((r) => {
            console.log(r);
            display();
            hideModal(String(modalId));
            alertify.success(r.data.message);
          })
          .catch((e) => {
            console.log(e);
            alertify.error(e.data.message);
          });
      } else {
        hideLoader();
        alertify.error("This parent cannot be deleted");
      }
    };
  },
]);
