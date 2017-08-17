angular
    .module('app')
    .controller('toDoCtrl', toDoCtrl);

toDoCtrl.$inject = ['authService', 'dataSvc', '$window', '$log'];
function toDoCtrl(authService, dataSvc, $window, $log) {

    var auth = authService.authentication;
    var toDoMgr = dataSvc.manageToDos();
    var vm = this;

    vm.newToDo = {};
    vm.showAdd = false;
    vm.userData = dataSvc.getCurUser().get({ username: auth.userName }, function (data) {
        vm.toDos = data.toDos;
    });

    vm.addToDo = addToDo;
    vm.delToDo = delToDo;
    vm.toggleAdd = toggleAdd;


    function addToDo() {
        vm.newToDo.sailorId = vm.userData.id;
        toDoMgr.save(vm.newToDo, function (data) {
            vm.toDos.push(data);
            vm.newToDo = {};
            vm.newToDo.priority = "low";
            $window.document.getElementById('toDoItem').focus();
        });
    };

    function delToDo(toDoId) {
        toDoMgr.delete({ id: toDoId }, function (data) {
            vm.toDos = dataSvc.getToDos(vm.userData.id);
        });
    };

    function toggleAdd() {
        vm.showAdd = !vm.showAdd;
    };
};
