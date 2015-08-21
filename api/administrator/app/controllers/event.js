app.controller('eventController', ['$scope','$resource','$location','eventFactory',
function ($scope, $resource, $location,eventFactory) {
    $('.date').datepicker({
        format         : "dd/mm/yyyy",
        autoclose      : true,
        todayHighlight : true,
    });

    function getEvents(){
        eventFactory.getEvents()
        .success(function (data) {
            $scope.events = data.data;
            console.log(data);
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.messages[0];
        });
    }

    $scope.section = "view";
    getEvents();
    $scope.updateEvent = function (event) {

        eventFactory.updateEvent(event)
        .success(function () {
            $scope.status = 'Updated Customer! Refreshing customer list.';
            $scope.section = 'view';
        })
        .error(function (error) {
            $scope.status = 'Unable to update customer: ' + error.messages[0];
            alert($scope.status);
        });
    };

    $scope.insertEvent = function (event) {
        eventFactory.insertEvent(event)
        .success(function () {
            $scope.status = 'Inserted Customer! Refreshing customer list.';
            getEvents();
            $scope.section = 'view';
        }).
            error(function(error) {
            $scope.status = 'Unable to insert customer: ' + error.messages[0];
            alert($scope.status);
        });
    };

    
    $scope.deleteEvent = function (event) {
        eventFactory.deleteEvent(event.id_event)
        .success(function () {
            $scope.status = 'Deleted Customer! Refreshing customer list.';
            getEvents();
        })
        .error(function (error) {
            $scope.status = 'Unable to delete customer: ' + error.messages[0];
            alert($scope.status);
        });
    };
    $scope.editEvent = function(event){
        $scope.event = event;
        $scope.event.tanggal = moment($scope.event.tanggal).format('DD/MM/YYYY');
        $scope.section = 'update';

    };
    $scope.getDate = function(datetime){
        return moment(datetime).format('DD/MM/YYYY');
    }
    $scope.addEvent = function(){
        $scope.event  = {};
        $scope.section = 'input';
    };
    $scope.doneEdit = function(){
        $scope.section = 'view';
    };
    $scope.event = {};

    $scope.processEvent = function (event){
        event.gambar = "test";
        event.status= 1;

        if(event.tanggal.indexOf('/') == -1){
            event.tanggal = moment(event.tanggal,'DD/MM/YYYY').format('YYYY-MM-DD');
        }

        if ($scope.section == "update") {
            $scope.updateEvent(event);
        }else{
            $scope.insertEvent(event);
        }
        
    };
    
}]);

