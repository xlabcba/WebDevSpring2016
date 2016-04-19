/**
 * Created by lixie on 16/3/2.
 */

(function() {
    angular.module("RecipeApp")
        .factory("SearchService", SearchService);

    function SearchService($http, $q, $rootScope) {

        var api = {
            searchByTermAndLocation: searchByTermAndLocation,
            searchByID: searchByID,
            getMap: getMap
        };
        return api;

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];

            return result;
        }

        function searchByTermAndLocation(search_term, place) {

            var deferred = $q.defer();
            var method = "GET";
            var url = "http://api.yelp.com/v2/search?callback=JSON_CALLBACK";
            var params;
                params = {
                    callback: 'angular.callbacks._0',
                    term: search_term,
                    location: place,
                    limit: 10,
                    category_filter: 'beer_and_wine',

                    oauth_consumer_key: 'EYrvT62X3vQqDvTNQ71o1A',
                    oauth_token: 'F1HeWQsFR85h63DGrdCcZMnHOkOinVv8',
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: new Date().getTime(),
                    oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

                };

            var consumerSecret = 'xpvS6p4w7VEQr9mzdLijo5Gxoa0';
            var tokenSecret = 'XcZBD_Ig7Te4EaUXPnz724j00PA';
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });

            //put signature in params
            params.oauth_signature = signature;

            $http.jsonp(url, {
                params: params
            }).success(function(response) {
                deferred.resolve(response);
            }).error(function(response, status, header, config) {
                ////console.log(status);
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function searchByID(id) {

            var deferred = $q.defer();
            var method = "GET";
            var url = "https://api.yelp.com/v2/business/"+id+"?callback=JSON_CALLBACK";
            var params;
                params = {
                    callback: 'angular.callbacks._0',
                    actionlinks: true,

                    oauth_consumer_key: 'EYrvT62X3vQqDvTNQ71o1A',
                    oauth_token: 'F1HeWQsFR85h63DGrdCcZMnHOkOinVv8',
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: new Date().getTime(),
                    oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

                };

            var consumerSecret = 'xpvS6p4w7VEQr9mzdLijo5Gxoa0';
            var tokenSecret = 'XcZBD_Ig7Te4EaUXPnz724j00PA';
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });

            //put signature in params
            params.oauth_signature = signature;

            $http.jsonp(url, {
                params: params
            }).success(function(response) {
                deferred.resolve(response);
            }).error(function(response, status, header, config) {
                ////console.log(status);
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function getMap(coodinate) {

            var deferred = $q.defer();

            $http.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyAPUpPCYSmjFX42748V3EUsaDz5knicEas&callback=initMap")
            var method = "GET";
            var url = "http://api.yelp.com/v2/search?callback=JSON_CALLBACK";
            var params;
            params = {
                callback: 'angular.callbacks._0',
                term: search_term,
                location: place,
                limit: 10,
                category_filter: 'beer_and_wine',

                oauth_consumer_key: 'EYrvT62X3vQqDvTNQ71o1A',
                oauth_token: 'F1HeWQsFR85h63DGrdCcZMnHOkOinVv8',
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

            };

            var consumerSecret = 'xpvS6p4w7VEQr9mzdLijo5Gxoa0';
            var tokenSecret = 'XcZBD_Ig7Te4EaUXPnz724j00PA';
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });

            //put signature in params
            params.oauth_signature = signature;

            $http.jsonp(url, {
                params: params
            }).success(function(response) {
                deferred.resolve(response);
            }).error(function(response, status, header, config) {
                ////console.log(status);
                deferred.resolve(response);
            });
            return deferred.promise;

        }

    }

})();