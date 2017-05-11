'use strict';

angular.module('nchancy.testpage', [
    'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/test', {
    templateUrl: 'testpage/testpage.html',
    controller: 'TestpageCtrl'
  });
}])

.controller('TestpageCtrl', ['$scope', '$http',
    function($scope, $http) {

	    var N = 0;

		$("#createBoard").click(function(){
			N = parseInt( $('.boardSize').val() );
			$('.boardSize').val("")
			console.log(N);

			for(var i=0; i<N; i++){
				for(var j=0; j<N; j++){
					if(i % 2 == 1){
						if(j % 2 == 1) var rowData = $('<a></a>').addClass("waves-effect waves-light btn black cell valign-wrapper").click(function() {
					    	if($(this).data('clicked')){
					    		$(this).children("img").remove();
					    		$(this).data('clicked', false);
					    	} else{
					    		$(this).append('<img src="img/chancellor.png" height="70px" width="70px" class="image">');
					    		$(this).data('clicked', true);
					    	}
						});
			    		else var rowData = $('<a></a>').addClass("waves-effect waves-light btn white cell").click(function() {
					    	if($(this).data('clicked')){
					    		$(this).children("img").remove();
					    		$(this).data('clicked', false);
					    	} else{
					    		$(this).append('<img src="img/chancellor.png" height="70px" width="70px" class="image">');
					    		$(this).data('clicked', true);
					    	}
						});
					} else{
						if(j % 2 == 1) var rowData = $('<a></a>').addClass("waves-effect waves-light btn white cell").click(function() {
					    	if($(this).data('clicked')){
					    		$(this).children("img").remove();
					    		$(this).data('clicked', false);
					    	} else{
					    		$(this).append('<img src="img/chancellor.png" height="70px" width="70px" class="image">');
					    		$(this).data('clicked', true);
					    	}
						});
			    		else var rowData = $('<a></a>').addClass("waves-effect waves-light btn black cell").click(function() {
					    	if($(this).data('clicked')){
					    		$(this).children("img").remove();
					    		$(this).data('clicked', false);
					    	} else{
					    		$(this).append('<img src="img/chancellor.png" height="70px" width="70px" class="image">');
					    		$(this).data('clicked', true);
					    	}
						});
					}
			        $('#board').append(rowData);
				}
				$('#board').append('<br/>');
			}
		});

		function Create2DArray(rows) {
		  var arr = [];
		  for (var i=0;i<rows;i++) {
		     arr[i] = [];
		  }
		  return arr;
		}

        function ToString(arr) {
            var retString = '';
            for(var i = 0; i < arr.length; i++) {
                for(var j = 0; j < arr.length; j++) {
                    var added = (j == arr.length-1)?
                        "\n":" ";
                    retString += (i == arr.length-1 && j == arr.length-1)?
                        arr[i][j] : arr[i][j] + added;
                }
            }
            return retString;
        }

		$("#solve").click(function(){
			var array = Create2DArray(N);
			var i = 0;
			var j = 0;

			$('#board').children('a').each(function () {
			   if($(this).data('clicked')) array[i][j] = 1;
			   else array[i][j] = 0;

			   if(j==N-1){
					j=0;
					i++;
			   } else{
			   		j++;
			   }

			});

            $http.post('http://localhost:1337/api/tools/generate', {
                input: ToString(array),
                size: N
            })
                .then(function successCallback(res) {
                    console.log("solutions");
                    console.log(res.data.solutions);
                    console.log("matrix");
                    console.log(ToString(array));
                }, function errorCallback(err) {
                    console.log(err);
                });
		});
	}
]);
