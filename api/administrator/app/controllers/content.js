app.controller('contentController', ['$rootScope','$scope','$resource','$location','contentFactory','kategoriFactory','$routeParams',
    function ($rootScope,$scope, $resource, $location,contentFactory,kategoriFactory,$routeParams) {
        clientId = '56a337509a8cc41e1aaf08c2439e9d14';
        $scope.baseurl = $rootScope.baseUrl;
        $scope.imageurl = $scope.baseurl + "/data/";
        $scope.kategori_content = {};
        $scope.section = "view";
        function getContents() {
            contentFactory.getContents()
            .success(function (data) {
                $scope.contents = data.data;
                console.log($scope.contents);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        }
        function getKategori(){
            kategoriFactory.getKategori()
            .success(function (data) {
                $scope.kategori_content = data.data;
                console.log(data);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        }
        getContents();

        getKategori();
        $scope.updateContent = function (content) {

            contentFactory.updateContent(content)
            .success(function () {
                $scope.status = 'Updated Customer! Refreshing customer list.';
            })
            .error(function (error) {
                $scope.status = 'Unable to update customer: ' + error.message;
            });
        };

        $scope.insertContent = function (content) {
            console.log($scope.files);
            contentFactory.insertContent(content, $scope.files)
            .success(function () {
                $scope.status = 'Inserted Customer! Refreshing customer list.';
                getContents();
            }).
                error(function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
            });
        };

        $scope.deleteContent = function (content) {
            contentFactory.deleteContent(content.id_content)
            .success(function () {
                $scope.status = 'Deleted Customer! Refreshing customer list.';
                getContents();
            })
            .error(function (error) {
                $scope.status = 'Unable to delete customer: ' + error.message;
            });
        };
        $scope.editContent = function(content){
            $scope.pause();
            $scope.content = content;
            $scope.section = 'update';
            console.log($scope.content);
        };
        $scope.addContent = function(){
            $scope.content = {};
            $scope.section = 'input';
            $scope.content.type = $scope.content_type[0].value;
            if($scope.kategori_content.length > 0){
                $scope.content.id_kategori = $scope.kategori_content[0].id_kategori;
            }
        };
        $scope.doneEdit = function(){
            $scope.section = 'view';
            $scope.files = null;
            $scope.content = null;
        };
        $scope.showDetail = function(content){
            console.log("menggila");
            
            console.log($scope.track);
            $scope.content = content;
        };
        $scope.content = {};
        $scope.content_type = [
            {
                value : '1',
                name :'GAMBAR'
            },
            {
                value : '2',
                name :'VIDEO'
            },
            {
                value : '3',
                name :'SOUND'
            }];
        $scope.content.type = $scope.content_type[0];
        $scope.section = $location.path().split('/')[2];

        $scope.processContent = function (content){
            if ($scope.section == "update") {
                $scope.updateContent(content);
                $scope.doneEdit();
            }else{
                content.status = 1;
                content.id_user = 1;
                $scope.insertContent(content);
                $scope.doneEdit();
            }
            
        };
        

}]);

