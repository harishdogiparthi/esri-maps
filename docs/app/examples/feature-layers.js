'use strict';

angular.module('esri-map-docs')
    .controller('FeatureLayersCtrl', function($scope, $http, $location) {
        dojo.require("esri.map");  
        dojo.require("esri.layers.graphics");
        dojo.require("esri.symbols.MarkerSymbol");
        var BASE_URL = 'http://dev-ws-altus.polariswireless.com';
        var token = '8fe45b5f-68ff-42de-9381-e023ec8a4102'; 

        //var initExtent = new esri.geometry.Extent          
        $scope.userLocationRequest = {
            
                 method: 'POST',
                 url: BASE_URL + '/api/status',
                 headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "token":token
                 },
                 data: JSON.stringify({
                    "notifLstTS": "2015-06-08T17:10:26.177Z",
                    "incUsrLocs": 1
                })
            };
            console.log($scope.userLocationRequest);
            return $http($scope.userLocationRequest)
                .then(loadUserLocations)
                .catch(function(message) {
                    console.log('XHR Failed for loadUserLocations : ', message);
                    $location.url('/login');
                });
                
                function loadUserLocations(resp, status, headers, config) {
                var userLocs = resp.data.userLocs;
                for (var i = 0; i < userLocs.length; i++) {  
                    addMarker(userLocs[i]);
                } 
                return resp.data;
            }
            function addMarker(pos, map){
                console.log("addMarker is called ", pos);
                var lat = pos.la;
                var lng = pos.lo;
                $scope.map = {
                    basemap: 'streets',
                    center: {
                        lat: lat, 
                        lng: lng
                    },
                    zoom: 4,
                }; 
                var map = $scope.map;
                var markerSymbol = new esri.symbol.SimpleMarkerSymbol();          
                basemap= new GraphicsLayer();
                //var basemap = new esri.layers.graphics($scope.map.basemap);  
                map.addLayer(basemap);  
                dojo.connect(map, 'onLoad', function() {   
                    var pt = new esri.geometry.Point(pos.la, pos.lo, new esri.SpatialReference({ 'wkid': 4326 }));  
                    map.graphics.add(new esri.Graphic(  
                        esri.geometry.geographicToWebMercator(pt), // geometry  
                        new esri.symbol.SimpleMarkerSymbol(), // symbol  
                            { 'title': 'Some Title...', 'content': 'Some content...' }, // attributes  
                            new esri.InfoTemplate('${title}', '${content}')  
                    ));
                });
            };

        
    });
