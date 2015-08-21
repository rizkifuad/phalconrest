app.controller('jadwalController', ['$scope','$resource','$location','jadwalFactory',
function ($scope, $resource, $location,jadwalFactory) {
    $('.date').datepicker({
        format         : "dd/mm/yyyy",
        autoclose      : true,
        todayHighlight : true,
    });

    function getJadwals(){
        jadwalFactory.getJadwals()
        .success(function (data) {
            $scope.jadwals = data.data;
            console.log(data);
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.messages[0];
        });
    }

    $scope.section = "view";
    getJadwals();
    $scope.updateJadwal = function (jadwal) {

        jadwalFactory.updateJadwal(jadwal)
        .success(function () {
            $scope.status = 'Updated Customer! Refreshing customer list.';
            $scope.section = 'view';
        })
        .error(function (error) {
            console.log(error);
            $scope.status = 'Unable to update customer: ' + error.messages[0];
            alert($scope.status);
        });
    };

    $scope.insertJadwal = function (jadwal) {
        jadwalFactory.insertJadwal(jadwal)
        .success(function () {
            $scope.status = 'Inserted Customer! Refreshing customer list.';
            getJadwals();
            $scope.section = 'view';
        }).
            error(function(error) {
            $scope.status = 'Unable to insert customer: ' + error.messages[0];
            alert($scope.status);
        });
    };

    
    $scope.deleteJadwal = function (jadwal) {
        jadwalFactory.deleteJadwal(jadwal.id_jadwal)
        .success(function () {
            $scope.status = 'Deleted Customer! Refreshing customer list.';
            getJadwals();
        })
        .error(function (error) {
            $scope.status = 'Unable to delete customer: ' + error.message[0];
            alert($scope.status);
        });
    };
    $scope.editJadwal = function(jadwal){
        $scope.jadwal = jadwal;
        $scope.jadwal.tanggal = moment($scope.jadwal.tanggal).format('DD/MM/YYYY');
        $scope.section = 'update';

    };
    $scope.getDate = function(datetime){
        return moment(datetime).format('DD/MM/YYYY');
        //return datetime;
    };
    $scope.addJadwal = function(){
        $scope.jadwal  = {};
        $scope.section = 'input';
    };
    $scope.doneEdit = function(){
        $scope.section = 'view';
    };
    $scope.jadwal = {};

    $scope.processJadwal = function (jadwal){
        jadwal.gambar = "test";
        jadwal.status = 1;
        if ($scope.section == "update") {
            $scope.updateJadwal(jadwal);
        }else{
            $scope.insertJadwal(jadwal);
        }
        
    };
    
}]);

