#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
  int **b;
  int count;
  int lastRow;
}board;

void boardToString(board *b, int N, char* dest) {
  int i, j, temp;
  char c;

  for(i = 0 ; i < N ; i++){
    for(j = 0 ; j < N ; j++){
      temp = b->b[i][j];
      c = temp + '0';
      dest[i*N+j] = c;
    }
  }
}

void printBoard(board *b, int N){
  int i, j;

  printf("\n======================================================");
  printf("\n count == %d\n", b->count);
  for(i = 0 ; i < N ; i++){
    for(j = 0 ; j < N ; j++){
      printf("%d ", b->b[i][j]);
    }
    printf("\n");
  }
}

board* createBoard(board *b, int N){
  int i, j;
  board *head = (board*)malloc(sizeof(board));

  head->b = (int**)malloc(sizeof(int*)*N);
  head->count = b->count;
  head->lastRow = b->lastRow-1;
  //initialize board empty :)
  for(i = 0 ; i < N ; i++){
    head->b[i] = (int*)malloc(sizeof(int)*N);
    for(j = 0 ; j < N ; j++){
      head->b[i][j] = b->b[i][j];
    }
  }

  return head;
}

int valid(board *b, int N, int row, int col){
  int i, j;

  // check ROW
  for(i = 0 ; i < N ; i++){
    if(i == row) continue;
    if(b->b[i][col] == 1) return 0;
  }

  // check COLUMN
  for(i = 0 ; i < N ; i++){
    if(i == col) continue;
    if(b->b[row][i] == 1) return 0;
  }

  // check L moves
  if(row - 2>=0 && col + 1<N && b->b[row - 2][col + 1]) return 0;
  if(row - 1>=0 && col + 2<N && b->b[row - 1][col + 2]) return 0;
  if(row + 1<N && col + 2<N && b->b[row + 1][col + 2]) return 0;
  if(row + 2<N && col + 1<N && b->b[row + 2][col + 1]) return 0;
  if(row + 2<N && col - 1>=0 && b->b[row + 2][col - 1]) return 0;
  if(row + 1<N && col - 2>=0 && b->b[row + 1][col - 2]) return 0;
  if(row - 1>=0 && col - 2>=0 && b->b[row - 1][col - 2]) return 0;
  if(row - 2>=0 && col - 1>=0 && b->b[row - 2][col - 1]) return 0;

  return 1;
}

int main(){

  FILE *fp, *out;
  board *head;
  board *temp;
  board *stack[256];
  char* boardString;
  int i, j, k, a, b, row, col;
  int numOfPuzzle, N;
  int check, currNumOfSolutions = 0;
  int tos = 0;
  int validBoard = 1;
  int tempRow, tempCol, hasOne;

  fp = fopen("input.txt", "r");
  out = fopen("output.txt", "w");

  if(fp == NULL){
  } else{
    fscanf( fp, "%d", &numOfPuzzle);

	for(i=0; i<numOfPuzzle; i++){
	  fscanf( fp, "%d", &N);
	  head = (board*)malloc(sizeof(board));
	  head->b = (int**)malloc(sizeof(int*)*N);
	  head->count = 0;
	  head->lastRow = N;
	  //CREATE THE BOARD
		for(j=0; j<N; j++){
			head->b[j] = (int*)malloc(sizeof(int)*N);
			for(k=0; k<N; k++){
			  fscanf( fp, "%d", &head->b[j][k]);
			  if(head->b[j][k] == 1)
			    head->count++;
			}
		}

	// // check if board is VALID
	// for(a=0; a<N; a++){
	// 	for(b=0; b<N; b++){
	// 		if(head->b[a][b] == 1 && !valid(head, N, a, b)){
	// 			validBoard = 0;
	// 			break;
	// 		}
	// 	}//close for
	// }//close for

    /*********************************************/
    if(head->count == N){
		++currNumOfSolutions;
        for(j=0; j<N; j++){
            for(k=0; k<N; k++){
              fprintf(out, "%d", stack[tos]->b[j][k]);
            }
            fprintf(out, "\n");
        }
        for(j=0;j<N;j++){
            fprintf(out, "=");
        }
        fprintf(out, "\n");
        free(head);
	}

    if(/*validBoard && */(currNumOfSolutions == 0)){
      	stack[tos++] = head;

		while(tos!=0){
			head = stack[--tos];

			if(head->count == N){
			  ++currNumOfSolutions;
              //CREATE THE BOARD
                for(j=0; j<N; j++){
                    for(k=0; k<N; k++){
                      fprintf(out, "%d", stack[tos]->b[j][k]);
                    }
                    fprintf(out, "\n");
                }
                for(j=0;j<N;j++){
                    fprintf(out, "=");
                }
                fprintf(out, "\n");
			  free(head);
			  continue;
			}

			row = N-1;

			hasOne = 0;
			for(tempRow = N-1 ; tempRow >= 0 ; tempRow--){
				hasOne = 0;
				for(tempCol = N-1 ; tempCol >= 0 ; tempCol--){
					if(head->b[tempRow][tempCol] == 1){
						hasOne = 1;
					}
				}
				if(hasOne == 0){
					row = tempRow;
					break;
				}
			}

			if(row < 0){
			  free(head);
			  continue;
			}

			/*
      printf("tempRow: %d\n", row);
			//if current row already contains a chancellor, skip
			for(tempRow = row ; tempRow >= 0 ; tempRow--){
				for(col = N-1 ; col >= 0 ; col--){
					printf("%d ", head->b[tempRow][col]);
				  if(head->b[tempRow][col] == 1){
				  	printf("skip row: %d\n", tempRow);
				    row = tempRow-1;
				    head->lastRow = tempRow-1;
				    break;
				  }
				}

				  printf("\n");
			}
      */

			for(col = N-1 ; col >= 0 ; col--){
			  if(head->b[row][col] == 1) continue;
			  temp = createBoard(head, N);
			  temp->b[row][col] = 1;
			  temp->count++;
			  if(valid(temp, N, row, col)){
			    stack[tos++] = temp;
			  } else free(temp);
			}
			// printf("\n");
		} // CLOSE WHILE
	/*********************************************/
    }/*else if(!validBoard){
    	// printf("Invalid board\n");
    }else{
    	// printf("Given board already a solution\n");
    }*/

    if(currNumOfSolutions == 0) fprintf(out, "nosolutions\n");
	// printf("Current number of solutions: %i\n", currNumOfSolutions);
    fprintf(out, "finished\n");
	currNumOfSolutions = 0;
	//Delete solutions
    }
  }

  fclose(fp);
  fclose(out);


  return 0;
}
