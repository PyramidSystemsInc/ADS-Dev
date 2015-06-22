(function () {
    'use strict';

    angular
        .module('app.typeahead')
        .controller('TypeaheadController', TypeaheadController);

    TypeaheadController.$inject = ['$http', '$scope'];
    /* @ngInject */
    function TypeaheadController($http, $scope) {
        var vm = this;
        vm.filterOptions = { filterText: '',  };
        vm.gridOptions = { data: 'vm.names', filterOptions: vm.filterOptions };
        
        vm.doSearch = function (evt) {
            $http.get('/data/drugsContaining/' + vm.ingredient)
                .success(function (response) { vm.drugsContaining = response.results; });
        };
        
        var bestPictures = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('results'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          remote: {
            url: '../data/products/%QUERY',
            wildcard: '%QUERY',        
            filter: function (parsedResponse) {
            // parsedResponse is the array returned from your backend
            var result = [];
            for (var i = 0; i < parsedResponse.results.length; i++) {
                var element = parsedResponse.results[i];
                result.push({"id": element.id, "value": element.openfda.brand_name[0]});
            }
            console.log(result);
            return result;
        }    
          }
        });
         
        $('#search .typeahead').typeahead(null, {
          name: 'productSearch',
          display: 'value',
          source: bestPictures
        });
    }
})();
