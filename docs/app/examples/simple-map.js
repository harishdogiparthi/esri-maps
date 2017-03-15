'use strict';

angular.module('esri-map-docs')
    .controller('SimpleMapCtrl', function($scope, $http) {
    	dojo.require("esri.map");  
      	dojo.require("esri.layers.FeatureLayer"); 
      	dojo.require("layer.layerDefinition.json"); 
    	$scope.map = {
            center: {
                lat: 37.75,
                lng: -122.45
            },
            zoom: 13
        };
        $http.get('layer.json').then(function(res){
          			$scope.layers = res.data;
          			              
        	//});
    	 //require(['esri/map', 'esri/layers/FeatureLayer', 'dojo/text!./layer.json'], function (Map, FeatureLayer, layerDefinition) {
        
        
        var definition = JSON.parse($scope.layers.layerDefinition);
        console.log(definition);

        var layer = new FeatureLayer(definition, { id: 'MyLayer' });
        dojo.connect($scope.map, 'onLoad', function() { 
            $scope.map.addLayer(layer);
        });
    });
    });
