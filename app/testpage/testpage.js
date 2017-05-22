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

.controller('TestpageCtrl', ['$scope',
    function($scope) {

	    var N = 0;
	    console.log($('#board').width());

	    $(window).resize(function(){
		    console.log("resize");
		});

		$("#createBoard").click(function(){
			N = parseInt( $('.boardSize').val() );
			$('.boardSize').val("");

			for(var i=0; i<N; i++){
				for(var j=0; j<N; j++){
					if(i % 2 == 1){
						if(j % 2 == 1) var rowData = $('<a></a>').addClass("waves-effect waves-light btn black cell valign-wrapper").css({"width": "calc(100%/"+ N +")", "padding-bottom": "calc(100%/"+ N +")"}).click(function() {
					    	if($(this).data('clicked')){
					    		$(this).children("div").children("img").remove();
					    		$(this).data('clicked', false);
					    	} else{
					    		$(this).append('<div class="content"><img src="img/chancellor.png" class="image"></div>');
					    		$(this).data('clicked', true);
					    	}
						});
			    		else var rowData = $('<a></a>').addClass("waves-effect waves-light btn white cell").css({"width": "calc(100%/"+ N +")", "padding-bottom": "calc(100%/"+ N +")"}).click(function() {
					    	if($(this).data('clicked')){
					    		$(this).children("div").children("img").remove();
					    		$(this).data('clicked', false);
					    	} else{
					    		$(this).append('<div class="content"><img src="img/chancellor.png" class="image"></div>');
					    		$(this).data('clicked', true);
					    	}
						});
					} else{ 
						if(j % 2 == 1) var rowData = $('<a></a>').addClass("waves-effect waves-light btn white cell").css({"width": "calc(100%/"+ N +")", "padding-bottom": "calc(100%/"+ N +")"}).click(function() {
					    	if($(this).data('clicked')){
					    		$(this).children("div").children("img").remove();
					    		$(this).data('clicked', false);
					    	} else{
					    		$(this).append('<div class="content"><img src="img/chancellor.png" class="image"></div>');
					    		$(this).data('clicked', true);
					    	}
						});
			    		else var rowData = $('<a></a>').addClass("waves-effect waves-light btn black cell").css({"width": "calc(100%/"+ N +")", "padding-bottom": "calc(100%/"+ N +")"}).click(function() {
					    	if($(this).data('clicked')){
					    		$(this).children("div").children("img").remove();
					    		$(this).data('clicked', false);
					    	} else{
					    		$(this).append('<div class="content"><img src="img/chancellor.png" class="image"></div>');
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

		$("#solve").click(function(){
			var array = Create2DArray(N);
			var i = 0;
			var j = 0;

			$('#board').children('a').each(function () {
			   if($(this).data('clicked')) array[i][j] = 1;
			   else array[i][j] = 0;
			   
			   if(j==N){
					j=0;
					i++;
			   } else{
			   		j++;
			   }

			});
		});
	}
]);
