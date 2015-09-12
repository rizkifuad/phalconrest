angular.module('almunApp.controllers', [])
.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('BrowseCtrl', function($scope) {
    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('GambarCtrl', function($scope, $location, $stateParams, contentFactory, $rootScope) {
    $scope.filterGambar = function(content) {
        index = $scope.contents.indexOf(content);
        if(index % 3 == 0) return content; 
    };
    $scope.getid = function(content){
        return $scope.contents.indexOf(content);
    }
    $scope.items = [];
    $scope.count_item = 0;
    for (var i = 0; i < 1000; i++) $scope.items.push(i);
    $scope.contents = [];
    $scope.split_contents = [];
    $scope.urlBase = $rootScope.baseUrl;
    $scope.getThumb = function ( fullimg ){
        if(fullimg != null){
            full = fullimg.split('.');
            return full[0] + '_thumb.' + full[1];
        }
        return "";
    };
    $scope.detail = function ( id ){
        $location.path('app/gambar/'+id);
    }
    $scope.doRefresh = function() {
        getContents();
    };
    function getContents() {
        contentFactory.getContents(1)
        .success(function (data) {
            $scope.contents = data.data;
            $scope.split_contents = [];
            var j = 0;
            for (var i = 0, len = $scope.contents.length; i < len; i++) {
                if (i % 3 == 0){
                    j++;
                    $scope.split_contents[j] = [];
                }
                $scope.split_contents[j].push( $scope.contents[i] );
            }
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        })
        .finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        })
    }
    getContents();
})
.controller('GambarDetailCtrl', function($scope, $stateParams, contentFactory, $rootScope, $cordovaFileTransfer, $cordovaSocialSharing, $ionicModal, $ionicPopup, $timeout ) {
    $scope.urlBase= $rootScope.baseUrl;
    //socket.emit('push', 'menggila')
    $scope.getUrl = function(url){
        return $rootScope.baseUrl + "/"  + url;
    }
    $scope.shareR = function(content){
        console.log(content)
        imgurl = $rootScope.baseUrl + "/" + content.body;
        //window.plugins.socialsharing.share(content.judul, imgurl, 'menggila');
        window.plugins.socialsharing.share(content.judul, content.deskripsi,imgurl, content.judul)

    }
    $scope.showAlert = function(title, msg) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: msg,
            buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
                text: 'Ok',
            type: 'button-balanced',
            }]
        })
    }
    $scope.share = function(content){
        //alert('mengila');
        $cordovaSocialSharing
        .shareViaWhatsApp(content.deskripsi,$rootScope.baseUrl + "/"  + content.body,' - ' + content.deskripsi)
        .then(function(result) {
            // Success!
        }, function(err) {
            // Success!
            //alert(JSON.stringify(err));
            // An error occurred. Show a message to the user
        });
    };
    $scope.downloadFile = function(img) {
        var url = $scope.urlBase + "/" + img;
        //alert(url);
        var filename = url.split("/").pop();
        //alert(filename);
        var targetPath = cordova.file.externalRootDirectory + 'al-munawarrah/'+ filename;
        var trustHosts = true
        var options = {};
        //alert(cordova.file.externalRootDirectory);
        //alert(JSON.stringify(cordova.file));
        //alert("are we done");
        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
        .then(function(result) {
            $scope.showAlert('', 'Simpan berhasil!');
            // Success!
            //alert(JSON.stringify(result));
        }, function(error) {
            $scope.showAlert('Error', 'Simpan gagal!');
            //alert(JSON.stringify(error));
            // Error
        }, function (progress) {
            $timeout(function () {
                $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            })
        });
    }
    $scope.refresh = function(){
        console.log('menggila')
        getContent($stateParams.id);
    }
    $scope.content = {};
    function getContent(id) {
        contentFactory.getContent(id)
        .success(function (data) {
            $scope.content = data.data;
        });
    }
    getContent($stateParams.id);
})
.controller('VideoCtrl', function($scope, $stateParams, contentFactory, $rootScope, $location) {
    $scope.detail = function ( id ){
        $location.path('app/videos/'+id);
    }
    $scope.contents = [];
    $scope.split_contents = [];
    $scope.urlBase = $rootScope.baseUrl;
    $scope.doRefresh = function() {
        getContents();
    };
    $scope.getId = function ( str ){
        return str.split('v=')[1];
    }
    function getContents() {
        contentFactory.getContents(2)
        .success(function (data) {
            $scope.contents = data.data;
            $scope.split_contents = [];
            var j = 0;
            for (var i = 0, len = $scope.contents.length; i < len; i++) {
                if (i % 3 == 0){
                    j++;
                    $scope.split_contents[j] = [];
                }
                $scope.split_contents[j].push( $scope.contents[i] );
            }
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        })
        .finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        })
    }
    getContents();
})
.controller('VideoDetailCtrl', function($scope, $stateParams, contentFactory, $rootScope, $location, $cordovaSocialSharing, $rootScope, $ionicNavBarDelegate, $ionicPlatform) {
    clientId = '56a337509a8cc41e1aaf08c2439e9d14';
    console.log($scope.urlBase)
    var orientation = 1;
    var deregister = $ionicPlatform.onHardwareBackButton(function(event) {
    });
    $ionicPlatform.onHardwareBackButton(function(event) {
        if(orientation == 1){
            $ionicNavBarDelegate.back()
        }else{
            screen.lockOrientation('portrait')
            orientation = 1;
            $ionicNavBarDelegate.showBar(true); 
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    $scope.$on('$destroy',deregister)
    $scope.rotate = function(){

        if(orientation == 1){
            $ionicNavBarDelegate.showBar(false); 
            orientation = 2
            screen.lockOrientation('landscape')

        }
        else{
            orientation = 1;
            screen.lockOrientation('portrait')
        }
    }
    $scope.share = function(content){
        //alert('mengila');
        //$cordovaSocialSharing
        //.shareViaWhatsApp(content.deskripsi,null,' - ' + content.body)
        //.then(function(result) {
            //alert(JSON.stringify(result));
            //// Success!
        //}, function(err) {
            //alert(JSON.stringify(err));
            //// An error occurred. Show a message to the user
        //});
        deskripsi = content.deskripsi == null ? "" : " : " + content.deskripsi;
        window.plugins.socialsharing.share(content.deskripsi, content.judul + deskripsi, null, content.body)
    };
    $scope.content = {};
    function getContent(id) {
        contentFactory.getContent(id)
        .success(function (data) {
            $scope.content = data.data;
        });
    }
    getContent($stateParams.id);
    $scope.urlBase= $rootScope.baseUrl;
})
.controller('AudioCtrl', function($scope, $stateParams, contentFactory, $rootScope, $location) {
    $scope.contents = [];
    $scope.split_contents = [];
    $scope.urlBase = $rootScope.baseUrl;
    $scope.doRefresh = function() {
        getContents();
    };
    $scope.detail = function ( content ){
        console.log(content)
        $location.path('app/audio/'+content.id_content+'/'+encodeURIComponent(content.body));
    }
    $scope.getId = function ( str ){
        return str.split('v=')[1];
    }
    function getContents() {
        contentFactory.getContents(3)
        .success(function (data) {
            $scope.contents = data.data;
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        })
        .finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        })
    }
    getContents();
})
.controller('AudioDetailCtrl', function($scope, $stateParams, contentFactory, $rootScope, $cordovaSocialSharing) {

    $scope.share = function(content){
        console.log(content)
        //window.plugins.socialsharing.share(content.judul, imgurl, 'menggila');
        deskripsi = content.deskripsi == null ? "" : " : " + content.deskripsi;
        window.plugins.socialsharing.share(content.deskripsi, content.judul + deskripsi, null, content.body)

    }
    $scope.content = {};
    function getContent(id) {
        contentFactory.getContent(id)
        .success(function (data) {
            console.log($scope.player)
            $scope.content = data.data;
            console.log($scope.content.body)
        });
    }
    getContent($stateParams.id);
    $scope.url = decodeURIComponent($stateParams.url)
})
.controller('JadwalCtrl', function($scope, $stateParams, jadwalFactory, $rootScope, $location) {
    $scope.detail = function ( id ){
        $location.path('app/jadwal/'+id);
    }
    $scope.urlBase = $rootScope.baseUrl;
    $scope.doRefresh = function() {
        getJadwals();
    };
    $scope.getId = function ( str ){
        return str.split('v=')[1];
    }
    function getJadwals() {
        jadwalFactory.getJadwals()
        .success(function (data) {
            $scope.jadwal = data.data;
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        })
        .finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        })
    }
    getJadwals();
})
.controller('JadwalDetailCtrl', function($scope, $stateParams, jadwalFactory, $rootScope, uiGmapGoogleMapApi) {
    $scope.getDate = function(date){
        return moment(date).format('DD MMMM YYYY')
    }
    $scope.getTime = function(date){
        return moment(date).format('HH:mm')
    }
    $scope.urlBase = $rootScope.baseUrl;
    $scope.content = {};
    function getJadwal(id) {
        jadwalFactory.getContent(id)
        .success(function (data) {
            console.log(data);
            $scope.jadwal = data.data;
            c = $scope.jadwal.koordinat.split(',')
            if(c.length > 0){
                console.log(c)
                d = {
                    latitude : c[0],
                    longitude : c[1]
                }
                var default_loc = d
                var default_zoom = 13
                uiGmapGoogleMapApi.then(function(maps) {
                    $scope.options = {scrollwheel: false};
                    $scope.map = { 
                        center: default_loc, 
                        zoom: default_zoom, control : {},
                    };
                    $scope.marker = {
                        id: 0,
                        coords: {
                            latitude: default_loc.latitude,
                            longitude: default_loc.longitude
                        },
                        control : {},

                    };
                });
            }
        });
    }
    getJadwal($stateParams.id);
})
.controller('EventCtrl', function($scope, $stateParams, eventFactory, $rootScope, $location, $cordovaLocalNotification) {
    $scope.detail = function ( id ){
        $location.path('app/events/'+id);
    }
    $scope.urlBase = $rootScope.baseUrl;
    $scope.doRefresh = function() {
        getEvents();
    };
    function getEvents() {
        eventFactory.getEvents()
        .success(function (data) {
            $scope.events = data.data;
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        })
        .finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        })
    }
    getEvents();
})
.controller('EventDetailCtrl', function($scope, $stateParams, eventFactory, $rootScope, $location, $cordovaLocalNotification, $ionicPlatform, uiGmapGoogleMapApi) {
    $scope.getDate = function(date){
        return moment(date).format('DD MMMM YYYY')
    }
    $scope.getTime = function(date){
        return moment(date).format('HH:mm')
    }
    $ionicPlatform.ready(function () {
        $scope.scheduleSingleNotification = function () {
            $cordovaLocalNotification.schedule({
                id: 1,
                title: 'Title here',
                text: 'Text here',
                data: {
                    customProperty: 'custom value'
                }
            }).then(function (result) {
                // ...
            });
        };
        $scope.scheduleSingleNotification();
    });
    $scope.urlBase = $rootScope.baseUrl;
    $scope.content = {};
    function getEvent(id) {
        eventFactory.getContent(id)
        .success(function (data) {
            console.log(data);
            $scope.event = data.data;
            c = $scope.event.koordinat.split(',')
            if(c.length > 0){
                console.log(c)
                d = {
                    latitude : c[0],
                    longitude : c[1]
                }
                var default_loc = d
                var default_zoom = 13
                uiGmapGoogleMapApi.then(function(maps) {
                    $scope.options = {scrollwheel: false};
                    $scope.map = { 
                        center: default_loc, 
                        zoom: default_zoom, control : {},
                    };
                    $scope.marker = {
                        id: 0,
                        coords: {
                            latitude: default_loc.latitude,
                            longitude: default_loc.longitude
                        },
                        control : {},

                    };
                });
            }
        });
    }
    getEvent($stateParams.id);
})
