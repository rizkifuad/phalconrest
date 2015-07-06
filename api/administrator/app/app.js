var app = angular.module('almunApp', ['ngRoute','ngResource','ngFileUpload','youtube-embed'])
.config(['$routeProvider',
function($routeProvider) {
    $routeProvider.
        when('/', {
        templateUrl: './templates/home.html',
        controller: 'contentController'
    }).
        when('/kategori', {
        templateUrl: './templates/kategori.html',
        controller: 'contentController'
    }).
        when('/events', {
        templateUrl: './templates/events.html',
        controller: 'eventController'
    }).
        when('/jadwal', {
        templateUrl: './templates/jadwal.html',
        controller: 'jadwalController'
    }).
    otherwise({redirectTo: '/'});


}]);
app.run(function($rootScope) {
    $rootScope.baseUrl = 'http://api.kajian.org';
});



app.directive('header', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "app/directives/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
            $('.sidebar-menu > li > a').on('click',function(e){
                $('.sidebar-menu li').removeClass('active');
                $(this).parent().addClass('active');
                if($(this).attr('href') === '#'){
                    e.preventDefault();
                }
            });

            $('.sidebar-toggle').on('click',function(e){
                var Aactive = $('body').attr('class');
                var active = Aactive.indexOf('sidebar-collapse') > -1 ? true : false;

                if(active){
                    $('body').removeClass('sidebar-collapse');
                }else{
                    $('body').addClass('sidebar-collapse');
                }
                e.preventDefault();
            });

        }]
    };
});

app.directive('ngScTrack', ['$http',
    function($http) {
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
]);
