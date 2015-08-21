angular.module('almunApp')
.factory('kategoriFactory', ['$http','$rootScope', function($http,$rootScope) {

    var urlBase = $rootScope.baseUrl + '/kategori';
    var kategoriFactory = {};

    kategoriFactory.getKategori = function () {
        return $http.get(urlBase);
    };

    kategoriFactory.getContent = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    kategoriFactory.insertKategori  = function (data) {
        return $http.post(urlBase, data);
    };

    kategoriFactory.updateKategori = function (data) {
        return $http.put(urlBase + '/' , data);
    };

    kategoriFactory.deleteKategori = function (id) {
        return $http.delete(urlBase + '/' + id);
    };


    return kategoriFactory;
}]);

angular.module('almunApp')
.factory('contentFactory', ['$http','$rootScope', function($http,$rootScope) {

    var urlBase = $rootScope.baseUrl + '/content';
    var contentFactory = {};

    contentFactory.getContents = function (type) {
        return $http.get(urlBase + '/type/' + type);
    };

    contentFactory.getContent = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    contentFactory.insertContent  = function (data, files) {
        var file = null;
        if(files && files.length){
            file = files[0];
            console.log(files);
        }
        return Upload.upload({
            url: urlBase,
            data: data,
            file: file
        });
            
    };

    contentFactory.updateContent = function (data) {
        return $http.put(urlBase, data);
    };

    contentFactory.deleteContent = function (id) {
        return $http.delete(urlBase + '/' + id);
    };


    return contentFactory;
}]);

angular.module('almunApp')
.factory('eventFactory', ['$http','$rootScope', function($http,$rootScope) {

    var urlBase = $rootScope.baseUrl + '/event';
    var eventFactory = {};

    eventFactory.getEvents = function () {
        return $http.get(urlBase);
    };

    eventFactory.getContent = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    eventFactory.insertEvent  = function (data) {
        return $http.post(urlBase, data);
    };

    eventFactory.updateEvent = function (data) {
        return $http.put(urlBase + '/' , data);
    };

    eventFactory.deleteEvent = function (id) {
        return $http.delete(urlBase + '/' + id);
    };


    return eventFactory;
}]);

angular.module('almunApp')
.factory('jadwalFactory', ['$http','$rootScope', function($http,$rootScope) {

    var urlBase = $rootScope.baseUrl + '/jadwal';
    var jadwalFactory = {};

    jadwalFactory.getJadwals = function () {
        return $http.get(urlBase);
    };

    jadwalFactory.getContent = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    jadwalFactory.insertJadwal  = function (data) {
        return $http.post(urlBase, data);
    };

    jadwalFactory.updateJadwal = function (data) {
        return $http.put(urlBase + '/' , data);
    };

    jadwalFactory.deleteJadwal = function (id) {
        return $http.delete(urlBase + '/' + id);
    };


    return jadwalFactory;
}]);
