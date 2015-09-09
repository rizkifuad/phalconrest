app.controller('jadwalController', ['$scope','$resource','$location','jadwalFactory','uiGmapGoogleMapApi',
function ($scope, $resource, $location,jadwalFactory, uiGmapGoogleMapApi) {
    $('.date').datetimepicker({
        format         : "d/m/Y H:i",
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

        jadwalFactory.updateJadwal(jadwal, $scope.files)
        .success(function () {
            $scope.status = 'Updated Customer! Refreshing customer list.';
            $scope.section = 'view';
            $scope.files = null;
        })
        .error(function (error) {
            console.log(error);
            $scope.status = 'Unable to update customer: ' + error.messages[0];
            alert($scope.status);
        });
    };
    $scope.insertJadwal = function (jadwal) {
        console.log($scope.jadwal)
        jadwalFactory.insertJadwal(jadwal, $scope.files)
        .success(function () {
            $scope.status = 'Inserted Customer! Refreshing customer list.';
            getJadwals();
            $scope.section = 'view';
            $scope.files = null;
        }).
            error(function(error) {
            $scope.status = 'Unable to insert customer: ' + error.messages[0];
            $scope.files = null;
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
    var cur_jadwal = {}
    $scope.editJadwal = function(jadwal){
        cur_jadwal = jadwal;
        $scope.jadwal = jadwal;
        $scope.jadwal.tanggal = moment($scope.jadwal.tanggal).format('DD/MM/YYYY HH:mm');
        $scope.section = 'update';
        $scope.files = null;
        console.log(cur_jadwal)
    };
    $scope.getDate = function(datetime){
        return moment(datetime).format('DD/MM/YYYY HH:mm');
        //return datetime;
    };
    $scope.addJadwal = function(){
        cur_jadwal = {}
        $scope.jadwal  = {};
        $scope.files = null;
        $scope.section = 'input';
    };
    $scope.doneEdit = function(){
        $scope.files = null;
        $scope.section = 'view';
        $('#temp_koordinat').val('')
    };
    $scope.jadwal = {};

    $scope.processJadwal = function (jadwal){
        jadwal.status = 1;
        jadwal.koordinat = current_co
        console.log(current_co)
        console.log(jadwal.koordinat)
        if ($scope.section == "update") {
            $scope.updateJadwal(jadwal);
        }else{
            $scope.insertJadwal(jadwal);
        }
        
    };
    
    var default_loc = { latitude: -7.257472, longitude : 112.752088 };
    var default_zoom = 13
    uiGmapGoogleMapApi.then(function(maps) {

        current_co = '';
        $scope.options = {scrollwheel: false};
        $scope.map = { 
            center: default_loc, 
            zoom: default_zoom, control : {},
            events : {
                click: function(maps, eventName, args){
                    place = args[0].latLng
                    current_co = place.A + ',' + place.F
                    $scope.marker.coords = {latitude: place.A, longitude:place.F};
                    $scope.map.control.refresh({latitude: $scope.map.center.latitude, longitude:$scope.map.center.longitude+.0000000000001});
                    //$scope.map.control.getGMap().setZoom(default_zoom);
                    console.log(current_co)
                }
            }
        };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: default_loc.latitude,
                longitude: default_loc.longitude
            },
            control : {},

        };
        $scope.openMap = function(jadwal){
            $('#map-modal').modal('show');
            $('#temp_koordinat').val(jadwal.koordinat)
            console.log($('#temp_koordinat').val())
        }


        $('#map-modal').on('shown.bs.modal',function(e){
            var d = default_loc;
            $scope.marker.coords = d;
            cur_co= $('#temp_koordinat').val()
            console.log(cur_co)
            if(cur_co != '' || cur_co != null){
                c = cur_co.split(',')
                d.latitude = c[0]
                d.longitude = c[1]
            }
            $scope.marker.coord = d;
            $scope.map.control.refresh(d);
            $scope.map.control.getGMap().setZoom(default_zoom);
            $('.search-box').attr('style','')
        })
        $scope.selectPlace  = function(){
            $('#koordinat').val(current_co);
            $scope.jadwal.koordinat = current_co
            $('#map-modal').modal('hide')
            console.log(current_co)
        }
    });
        var events = {
            places_changed: function (searchBox) {
                places = searchBox.getPlaces();
                console.log(places)

                if (places.length == 0) {
                    return;
                }
                place = places[0]
                $scope.map.control.refresh({latitude: place.geometry.location.A, longitude:place.geometry.location.F});
                $scope.map.control.getGMap().setZoom(default_zoom);
            }
        }
        $scope.searchbox = { template:'searchbox.tpl.html', events:events};
}]);

