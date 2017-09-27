angular
    .module('app')
    .controller('toDoCtrl', toDoCtrl);

toDoCtrl.$inject = ['authService', 'dataSvc', '$window'];
function toDoCtrl(authService, dataSvc, $window) {

    var auth = authService.authentication;
    var toDoMgr = dataSvc.manageToDos();
    var vm = this;

    vm.authed = false;
    vm.newToDo = {};
    vm.toDos = [];
    vm.userData = {};
    vm.showAdd = false;

    vm.addToDo = addToDo;
    vm.delToDo = delToDo;
    vm.toggleAdd = toggleAdd;

    init();

    function init() {
        if (auth.isAuth) {
            vm.authed = true;
            vm.userData = dataSvc.getCurUser().$promise.then( function (data) {
                vm.toDos = data.toDos;
            });
        };
    };

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
