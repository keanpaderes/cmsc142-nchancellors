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

    	$(".button-collapse").sideNav();
    	var inputBoard;
    	var isFileInput = false;

    	/***********************  FILE READING ***********************/
    	if (window.File && window.FileReader && window.FileList && window.Blob) {
		  console.log('The File APIs are fully supported in this browser.');
		} else {
		  console.log('The File APIs are not fully supported in this browser.');
		}

		function handleFileSelect(evt) {
			isFileInput = true;
			$('#createBoard').addClass('disabled');
			var files = evt.target.files; // FileList object

			// Loop through the FileList and render image files as thumbnails.
			for (var i = 0, f; f = files[i]; i++) {

				var reader = new FileReader();

				// Closure to capture the file information.
				reader.onload = (function(theFile) {
					return function(e) {
						inputBoard = e.target.result;
						console.log(inputBoard);
					};
				})(f);

				reader.readAsText(f);
			}
		}

		document.getElementById('files').addEventListener('change', handleFileSelect, false);
		/*************************************************************/

	    var N = 0;

		$("#createBoard").click(function(){
			N = parseInt( $('.boardSize').val() );
			$('.boardSize').val("");

			for(var i=0; i<N; i++){
				for(var j=0; j<N; j++){
					if(i % 2 == 1){
						if(j % 2 == 1) var rowData = $('<a></a>').addClass("waves-effect waves-light btn black cell").css({"width": "calc(100%/"+ N +")", "padding-bottom": "calc(100%/"+ N +")"}).click(function() {
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

		function checkBoard(){
			console.log('checking board');
		}

		var classname = document.getElementsByClassName("cell");

		for (var i=0; i<classname.length; i++) {
		    classname[i].addEventListener('click', checkBoard, false);
		}


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

        function showSolutions(solutions){

        	for(var i=0; i<solutions.length; i++){
        		for(var j=0; j<solutions[i].length; j++){
        			for(var k=0; k<solutions[i][j].length; k++){
        				if(j % 2 == 1){
							if(k % 2 == 1) var rowData = $('<a></a>').addClass("waves-effect waves-light btn black");
				    		else var rowData = $('<a></a>').addClass("waves-effect waves-light btn white");

				    		if(solutions[i][j][k] == 1) rowData.append('<div class="content"><img src="img/chancellor.png" class="image"></div>');
						} else{ 
							if(k % 2 == 1) var rowData = $('<a></a>').addClass("waves-effect waves-light btn white");
				    		else var rowData = $('<a></a>').addClass("waves-effect waves-light btn black");

				    		if(solutions[i][j][k] == 1) rowData.append('<div class="content"><img src="img/chancellor.png" class="image"></div>');
						}
				        $('#solutions').append(rowData);
        			}
        			$('#solutions').append('<br/>');
        		}
        		$('#solutions').append('<br/>');
        	}

        }

        function convertBoardToArray(){
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
			return array;
        }

		$("#solve").click(function(){
			var solveBoard;

			if(isFileInput){
				solveBoard = inputBoard;  
			} else{
				var array = convertBoardToArray();
				solveBoard = ToString(array);
			}

            $http.post('http://localhost:1337/api/tools/generate', {
            	isFile: isFileInput,
                input: solveBoard,
                size: N
            })
                .then(function successCallback(res) {
                    showSolutions(res.data.solutions);
                }, function errorCallback(err) {
                    console.log(err);
                });
		});
	}
]);
