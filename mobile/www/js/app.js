// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('almunApp', ['ionic','ionicLazyLoad', 'almunApp.controllers','ngCordova','youtube-embed','uiGmapgoogle-maps'])
.service('ScrollRender', function() {
    this.render = function(content) {
        return (function(global) {

            var docStyle = document.documentElement.style;

            var engine;
            if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
                engine = 'presto';
            } else if ('MozAppearance' in docStyle) {
                engine = 'gecko';
            } else if ('WebkitAppearance' in docStyle) {
                engine = 'webkit';
            } else if (typeof navigator.cpuClass === 'string') {
                engine = 'trident';
            }

            var vendorPrefix = {
                trident: 'ms',
                gecko: 'Moz',
                webkit: 'Webkit',
                presto: 'O'
            }[engine];

            var helperElem = document.createElement("div");
            var undef;

            var perspectiveProperty = vendorPrefix + "Perspective";
            var transformProperty = vendorPrefix + "Transform";

            if (helperElem.style[perspectiveProperty] !== undef) {

                return function(left, top, zoom) {
                    content.style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
                };

            } else if (helperElem.style[transformProperty] !== undef) {

                return function(left, top, zoom) {
                    content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
                };

            } else {

                return function(left, top, zoom) {
                    content.style.marginLeft = left ? (-left / zoom) + 'px' : '';
                    content.style.marginTop = top ? (-top / zoom) + 'px' : '';
                    content.style.zoom = zoom || '';
                };

            }
        })(this);
    };

})

.directive('zoomable', function(ScrollRender) {
    return {
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                // Intialize layout
                var container = document.getElementById("container-imgdetail");
                var content = document.getElementById("content-imgdetail");
                var clientWidth = 0;
                var clientHeight = 0;

                // Initialize scroller
                var scroller = new Scroller(ScrollRender.render(content), {
                    scrollingX: true,
                    scrollingY: true,
                    animating: true,
                    bouncing: true,
                    locking: true,
                    zooming: true,
                    minZoom: 0.5,
                    maxZoom: 2
                });

                // Initialize scrolling rect
                var rect = container.getBoundingClientRect();
                scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);
                
                var image = document.getElementById('image-scrollable');
                var contentWidth = image.width;
                var contentHeight = image.height;

                // Reflow handling
                var reflow = function() {
                    clientWidth = container.clientWidth;
                    clientHeight = container.clientHeight;
                    scroller.setDimensions(clientWidth, clientHeight, contentWidth, contentHeight);
                };


                window.addEventListener("resize", reflow, false);
                reflow();

                if ('ontouchstart' in window) {

                    container.addEventListener("touchstart", function(e) {
                        // Don't react if initial down happens on a form element
                        if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
                            return;
                        }

                        scroller.doTouchStart(e.touches, e.timeStamp);
                        e.preventDefault();
                    }, false);

                    document.addEventListener("touchmove", function(e) {
                        scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
                    }, false);

                    document.addEventListener("touchend", function(e) {
                        scroller.doTouchEnd(e.timeStamp);
                    }, false);

                    document.addEventListener("touchcancel", function(e) {
                        scroller.doTouchEnd(e.timeStamp);
                    }, false);

                } else {

                    var mousedown = false;

                    container.addEventListener("mousedown", function(e) {
                        if (e.target.tagName.match(/input|textarea|select/i)) {
                            return;
                        }

                        scroller.doTouchStart([{
                            pageX: e.pageX,
                            pageY: e.pageY
                        }], e.timeStamp);

                        mousedown = true;
                    }, false);

                    document.addEventListener("mousemove", function(e) {
                        if (!mousedown) {
                            return;
                        }

                        scroller.doTouchMove([{
                            pageX: e.pageX,
                            pageY: e.pageY
                        }], e.timeStamp);

                        mousedown = true;
                    }, false);

                    document.addEventListener("mouseup", function(e) {
                        if (!mousedown) {
                            return;
                        }

                        scroller.doTouchEnd(e.timeStamp);

                        mousedown = false;
                    }, false);

                    container.addEventListener(navigator.userAgent.indexOf("Firefox") > -1 ? "DOMMouseScroll" : "mousewheel", function(e) {
                        console.log('asdf');
                        scroller.doMouseZoom(e.detail ? (e.detail * -120) : e.wheelDelta, e.timeStamp, e.pageX, e.pageY);
                    }, false);
                }
            });
        }
    };
})
.run(function($ionicPlatform, $rootScope) {
    //$rootScope.baseUrl = 'http://192.168.43.158';
    //$rootScope.baseUrl = 'http://192.168.169.4';
    $rootScope.baseUrl = 'http://192.168.1.131';
    //$rootScope.baseUrl = 'http://api.kajian.org';
    //$rootScope.baseUrl = 'http://128.199.132.72';
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.gambar', {
    url: '/gambar',
    views: {
      'menuContent': {
        templateUrl: 'templates/gambar.html',
        controller: 'GambarCtrl'
      }
    }
  })
  .state('app.gambardetail', {
    url: '/gambar/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/gambardetail.html',
        controller: 'GambarDetailCtrl'
      }
    }
  })

  .state('app.videos', {
      url: '/videos',
      views: {
        'menuContent': {
          templateUrl: 'templates/videos.html',
          controller: 'VideoCtrl'
        }
      }
    })

  .state('app.videosdetail', {
      url: '/videos/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/videodetail.html',
          controller: 'VideoDetailCtrl'
        }
      }
    })
    .state('app.audios', {
      url: '/audio',
      views: {
        'menuContent': {
          templateUrl: 'templates/audios.html',
          controller: 'AudioCtrl'
        }
      }
    })
    .state('app.audiosdetail', {
      url: '/audio/:id/:url',
      views: {
        'menuContent': {
          templateUrl: 'templates/audiodetail.html',
          controller: 'AudioDetailCtrl'
        }
      }
    })
    .state('app.jadwal', {
      url: '/jadwal',
      views: {
        'menuContent': {
          templateUrl: 'templates/jadwal.html',
          controller: 'JadwalCtrl'
        }
      }
    })
    .state('app.jadwaldetail', {
      url: '/jadwal/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/jadwaldetail.html',
          controller: 'JadwalDetailCtrl'
        }
      }
    })

    .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'templates/events.html',
          controller: 'EventCtrl'
        }
      }
    })
    .state('app.eventdetail', {
      url: '/events/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/eventdetail.html',
          controller: 'EventDetailCtrl'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/gambar');
})

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization,places'
    });
})
.directive('ngScTrack', ['$http','$rootScope',
    function($http, $rootScope) {
        function link(scope) {
            var clientid = '56a337509a8cc41e1aaf08c2439e9d14';
            $http({
                method : 'GET',
                url : 'https://api.soundcloud.com/resolve.json?url='+scope.track+'&client_id='+clientid
            }).
            success(function(data){
                console.log(data);
                playTrack(data.id);

            });
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) { 

                scope.song.pause();
            });
            var playTrack = function(id){
                $http({
                    method: 'GET',
                    url: 'http://api.soundcloud.com/tracks/' + id + '.json?client_id=' + clientid
                }).
                    success(function(data) {
                    scope.band = data.user.username;
                    scope.bandUrl = data.user.permalink_url;
                    scope.title = data.title;
                    scope.trackUrl = data.permalink_url;
                    if(scope.albumArt)
                        scope.albumArt = data.artwork_url.replace("large", "t500x500");
                    scope.wave = data.waveform_url;
                    scope.stream = data.stream_url + '?client_id=' + clientid;
                    scope.song = new Audio();
                });
                scope.playing = false;
                scope.play = function() {
                    scope.playing = !scope.playing;
                    if (!scope.playing) {
                        scope.song.pause();
                    } else {
                        if (scope.song.src == '') {
                            scope.song.src = scope.stream;
                        }
                        scope.song.play();
                    }
                }
            }
        }
        return {
            restrict: 'E',
            scope: {
                track: '=track',
            },
            templateUrl: "./templates/ng-sc-track.html",
            link: link
        };
    }
])

//.factory('socket', function ($rootScope) {
    //var socket = io.connect('http://192.168.1.131:3000');
    //return {
        //on: function (eventName, callback) {
            //socket.on(eventName, function () {  
                //var args = arguments;
                //$rootScope.$apply(function () {
                    //callback.apply(socket, args);
                //});
            //});
        //},
        //emit: function (eventName, data, callback) {
            //socket.emit(eventName, data, function () {
                //var args = arguments;
                //$rootScope.$apply(function () {
                    //if (callback) {
                        //callback.apply(socket, args);
                    //}
                //});
            //});
        //}
    //};
//});
