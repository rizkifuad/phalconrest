app.controller('kategoriController', ['$scope','$resource','$location','kategoriFactory','$routeParams',
    function ($scope, $resource, $location,kategoriFactory,$routeParams) {
        function getKategori(){
            kategoriFactory.getKategori()
            .success(function (data) {
                $scope.kategori = data.data;
                console.log(data);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        }

        $scope.section = "view";
        getKategori();
        $scope.updateKategori = function (kategori) {

            kategoriFactory.updateKategori(kategori)
            .success(function () {
                $scope.status = 'Updated Customer! Refreshing customer list.';
            })
            .error(function (error) {
                $scope.status = 'Unable to update customer: ' + error.message;
            });
        };

        $scope.insertKategori = function (cat) {
            kategoriFactory.insertKategori(cat)
            .success(function () {
                $scope.status = 'Inserted Customer! Refreshing customer list.';
                getKategori();
            }).
                error(function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
            });
        };

        
        $scope.deleteKategori = function (cat) {
            kategoriFactory.deleteKategori(cat.id_kategori)
            .success(function () {
                $scope.status = 'Deleted Customer! Refreshing customer list.';
                getKategori();
            })
            .error(function (error) {
                $scope.status = 'Unable to delete customer: ' + error.message;
            });
        };
        $scope.editKategori = function(cat){
            $scope.cat = cat;
            $scope.section = 'update';
        };
        $scope.addKategori = function(){
            $scope.cat  = {};
            $scope.section = 'input';
        };
        $scope.doneEdit = function(){
            $scope.section = 'view';
        };
        $scope.cat = {};

        $scope.processKategori = function (kategori){
            if ($scope.section == "update") {
                $scope.updateKategori(kategori);
                $scope.section = 'view';
            }else{
                $scope.insertKategori(kategori);
                $scope.section = 'view';
            }
            
        };
        

}]);

