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
    	$('.modal').modal();
    	$('.collapsible').collapsible();
    	$('#reset').addClass('disabled');
    	$('#solve').addClass('disabled');

    	$('#reset').click(function(){
			location.reload();
		});

    	var inputBoard;
    	var isFileInput = false;

    	/*********************** FILE READING ***********************/
    	if (window.File && window.FileReader && window.FileList && window.Blob) {
		  console.log('The File APIs are fully supported in this browser.');
		} else {
		  console.log('The File APIs are not fully supported in this browser.');
		}

		function handleFileSelect(evt) {
			isFileInput = true;
			$('#createBoard').addClass('disabled');
			$('#solve').removeClass('disabled');
			$('#reset').removeClass('disabled');
			var files = evt.target.files;

			for (var i = 0, f; f = files[i]; i++) {

				var reader = new FileReader();

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
		/************************************************************/

		/************************ READ BOARD ************************/
	    var N = 0;

	    // creates the board
		$("#createBoard").click(function(){
			N = parseInt( $('.boardSize').val() );
			$('.boardSize').val("");

			if(N <= 3 || isNaN(N)){
				$('#invalid').modal('open');
			} else{
				$('#fileButton').addClass('disabled');
				$('#createBoard').addClass('disabled');
				$('#solve').removeClass('disabled');
				$('#reset').removeClass('disabled');

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
						    		var array = convertBoardToArray();
						    		if(checkIfSolved(array, N)){
						    			$('#winner').modal('open');
						    		}  
						    	}
							});
				    		else var rowData = $('<a></a>').addClass("waves-effect waves-light btn white cell").css({"width": "calc(100%/"+ N +")", "padding-bottom": "calc(100%/"+ N +")"}).click(function() {
						    	if($(this).data('clicked')){
						    		$(this).children("div").children("img").remove();
						    		$(this).data('clicked', false);
						    	} else{
						    		$(this).append('<div class="content"><img src="img/chancellor.png" class="image"></div>');
						    		$(this).data('clicked', true);
						    		var array = convertBoardToArray();
						    		if(checkIfSolved(array, N)){
						    			$('#winner').modal('open');
						    		} 
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
						    		var array = convertBoardToArray();
						    		if(checkIfSolved(array, N)){
						    			$('#winner').modal('open');
						    		} 
						    	}
							});
				    		else var rowData = $('<a></a>').addClass("waves-effect waves-light btn black cell").css({"width": "calc(100%/"+ N +")", "padding-bottom": "calc(100%/"+ N +")"}).click(function() {
						    	if($(this).data('clicked')){
						    		$(this).children("div").children("img").remove();
						    		$(this).data('clicked', false);
						    	} else{
						    		$(this).append('<div class="content"><img src="img/chancellor.png" class="image"></div>');
						    		$(this).data('clicked', true);
						    		var array = convertBoardToArray();
						    		if(checkIfSolved(array, N)){
						    			$('#winner').modal('open');
						    		} 
						    	}
							});
						}
				        $('#board').append(rowData);
					}
					$('#board').append('<br/>');
				}
			}
		});

		function valid(board, row, col, num){

			// check ROW
			for(var i=0; i<num; i++){
				if(i == row) continue;
				if(board[i][col] == 1) return false;
			}

			// check COLUMN
			for(var i=0; i<num; i++){
				if(i == col) continue;
				if(board[row][i] == 1) return false;
			}

			// check L moves
			if(row - 2>=0 && col + 1<num && board[row - 2][col + 1]) return false;
			if(row - 1>=0 && col + 2<num && board[row - 1][col + 2]) return false;
			if(row + 1<num && col + 2<num && board[row + 1][col + 2]) return false;
			if(row + 2<num && col + 1<num && board[row + 2][col + 1]) return false;
			if(row + 2<num && col - 1>=0 && board[row + 2][col - 1]) return false;
			if(row + 1<num && col - 2>=0 && board[row + 1][col - 2]) return false;
			if(row - 1>=0 && col - 2>=0 && board[row - 1][col - 2]) return false;
			if(row - 2>=0 && col - 1>=0 && board[row - 2][col - 1]) return false;

			return true;
		}

		function checkBoard(board, num){

			for(var a=0; a<num; a++){
				for(var b=0; b<num; b++){
					if(board[a][b] == 1 && !valid(board, a, b, num)){
						return false;
						break;
					}
				}
			}
			return true;
		}

		function checkIfSolved(board, num){

			var count = 0;
			for(var a=0; a<num; a++){
				for(var b=0; b<num; b++){
					if(board[a][b] == 1 && valid(board, a, b, num)){
						count++;
					}
				}
			}
			if(count == num) return true;
			else return false;

		}

		/************************************************************/

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

        function showSolutions(puzzles){

            for(var h=0; h<puzzles.length; h++) {
            	var list = $('<li></li>');
            	var divHeader = $('<div><b>BOARD '+ (h+1) +'</b> (' + puzzles[h].length + ' solution/s)</div>').addClass('collapsible-header');
            	list.append(divHeader);
            	var divBody = $('<div></div>').addClass('collapsible-body col s12'); 
            	divBody.append('<br/>');
            	for(var i=0; i<puzzles[h].length; i++){
            		for(var j=0; j<puzzles[h][i].length; j++){
            			for(var k=0; k<puzzles[h][i][j].length; k++){
            				if(j % 2 == 1){
    							if(k % 2 == 1) var rowData = $('<a></a>').addClass("waves-effect waves-light btn black");
    				    		else var rowData = $('<a></a>').addClass("waves-effect waves-light btn white");
            
    				    		if(puzzles[h][i][j][k] == 1) rowData.append('<div class="content"><img src="img/chancellor.png" class="image"></div>');
    						} else{
    							if(k % 2 == 1) var rowData = $('<a></a>').addClass("waves-effect waves-light btn white");
    				    		else var rowData = $('<a></a>').addClass("waves-effect waves-light btn black");
            
    				    		if(puzzles[h][i][j][k] == 1) rowData.append('<div class="content"><img src="img/chancellor.png" class="image"></div>');
    						}
    				        divBody.append(rowData);
            			}
            			divBody.append('<br/>');
            		}
            		divBody.append('<br/>');
            		list.append(divBody);
            	}
            	$('#solutions').append(list);
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

        function chechTextFileIfValid(board){
        	board = board.split("\n");
        	var count = 1;
        	var noOfPuzzles = board[0];
        	var listOfboard = [];

        	for(var i=0; i<noOfPuzzles; i++){
        		var size = board[count++];
        		var array = Create2DArray(size);
        		for(var j=0; j<size; j++){
        			var row = board[count++].split(" ");
        			for(var k=0; k<size; k++){
        				array[j][k] = parseInt(row[k]);
        			}
        		}
        		listOfboard.push(array);
        	}

        	for(var i=0; i<listOfboard.length; i++){
        		if( !checkBoard(listOfboard[i], listOfboard[i].length) ){
        			return false;
        			break;
        		}
        	}

        	return true;
        }

		$("#solve").click(function(){
			$('#solve').addClass('disabled');
			var solveBoard;
			var isValid = true;

			if(isFileInput){
				if(chechTextFileIfValid(inputBoard)) solveBoard = inputBoard;
				else{
					isValid = false;
					$('#invalidBoard').modal('open');
				}
			} else{
				var array = convertBoardToArray();
				if(checkBoard(array, N)) solveBoard = ToString(array);
				else{
					isValid = false;
					$('#invalidBoard').modal('open');
				}
			}

			if(isValid){
				$http.post('http://localhost:1337/api/tools/generate', {
	            	isFile: isFileInput,
	                input: solveBoard,
	                size: N
	            }).then(function successCallback(res) {
	            	console.log(res.data.solutions);
                    showSolutions(res.data.solutions);
                }, function errorCallback(err) {
                    console.log(err);
                });
			}
		});
	}
]);
