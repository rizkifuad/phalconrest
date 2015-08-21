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
        console.log($scope.contents.indexOf(content));
        return $scope.contents.indexOf(content);
    }
    $scope.items = [];
    $scope.count_item = 0;
    for (var i = 0; i < 1000; i++) $scope.items.push(i);
    $scope.contents = [];
    $scope.split_contents = [];
    $scope.urlBase = $rootScope.baseUrl;
    $scope.getThumb = function ( fullimg ){
        full = fullimg.split('.');
        return full[0] + '_thumb.' + full[1];
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
.controller('GambarDetailCtrl', function($scope, $stateParams, contentFactory, $rootScope, $cordovaFileTransfer, $cordovaSocialSharing ) {
    $scope.share = function(content){
        alert('mengila');
        $cordovaSocialSharing
        .shareViaWhatsApp(content.deskripsi,$rootScope.baseUrl + "/"  + content.body,' - ' + content.deskripsi)
        .then(function(result) {
            alert(JSON.stringify(result));
            // Success!
        }, function(err) {
            alert(JSON.stringify(err));
            // An error occurred. Show a message to the user
        });
    };
  $scope.downloadFile = function(img) {
    var url = $scope.urlBase + "/" + img;
    alert(url);
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
        // Success!
        alert(JSON.stringify(result));
    }, function(error) {
        alert(JSON.stringify(error));
        // Error
    }, function (progress) {
        $timeout(function () {
            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        })
    });
  }
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
.controller('VideoDetailCtrl', function($scope, $stateParams, contentFactory, $rootScope, $location, $cordovaSocialSharing) {
    clientId = '56a337509a8cc41e1aaf08c2439e9d14';

    $scope.share = function(content){
        alert('mengila');
        $cordovaSocialSharing
        .shareViaWhatsApp(content.deskripsi,null,' - ' + content.body)
        .then(function(result) {
            alert(JSON.stringify(result));
            // Success!
        }, function(err) {
            alert(JSON.stringify(err));
            // An error occurred. Show a message to the user
        });
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
.controller('AudioCtrl', function($scope, $stateParams, contentFactory, $rootScope) {
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
.controller('AudioDetailCtrl', function($scope, $stateParams, contentFactory, $rootScope) {
    $scope.content = {};
    function getContent() {
        contentFactory.getContent()
        .success(function (data) {
            $scope.content = data;
        });
    }
    getContent();
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
.controller('JadwalDetailCtrl', function($scope, $stateParams, jadwalFactory, $rootScope) {
    $scope.content = {};
    function getJadwal(id) {
        jadwalFactory.getContent(id)
        .success(function (data) {
            console.log(data);
            $scope.jadwal = data.data;
        });
    }
    getJadwal($stateParams.id);
})
.controller('EventCtrl', function($scope, $stateParams, eventFactory, $rootScope, $location) {
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
.controller('EventDetailCtrl', function($scope, $stateParams, eventFactory, $rootScope, $location) {
    $scope.content = {};
    function getEvent(id) {
        eventFactory.getContent(id)
        .success(function (data) {
            console.log(data);
            $scope.event = data.data;
        });
    }
    getEvent($stateParams.id);
})
