#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
  int **b;
  int count;
  int lastRow;
}board;

struct node{
  char* solution;
  struct node *next;
};

int checkSolution(char *soln, struct node *headNode){
  int ret = 1, check;
  struct node *ptr = headNode;
  char *holder;
  while(ptr != NULL) {
    holder = ptr->solution;
    check = strcmp(soln, holder);
    if(check == 0){
      ret = 0;
    }
    ptr = ptr->next;
  }
  return ret;
}

void insertFirst(char *soln, struct node **headNode){
  char *solna;
  struct node *link = (struct node *)malloc(sizeof(struct node));
  link->solution = soln;
  link->next = *headNode;
  *headNode = link;
  solna = (*headNode)->solution;
}

void deleteAll(struct node **headNode){
  struct node *tmp;
  while(*headNode != NULL) {
    tmp = *headNode;
    *headNode = (*headNode)->next;
    free(tmp);
  }
  printf("Freed\n");
}

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

  FILE *fp;
  board *head;
  board *temp;
  board *stack[256];
  struct node *headNode = NULL;
  char* boardString;
  int i, j, k, a, b, row, col;
  int numOfPuzzle, N;
  int check, currNumOfSolutions = 0;
  int tos = 0;

  fp = fopen("input.txt", "r");

  if(fp == NULL){
    printf("File reading error!");
  } else{
    fscanf( fp, "%d", &numOfPuzzle);
    printf("No. of Puzzles : %d\n", numOfPuzzle);

    for(i=0; i<numOfPuzzle; i++){
      fscanf( fp, "%d", &N);
      printf("N: %d\n", N);

      head = (board*)malloc(sizeof(board));
      head->b = (int**)malloc(sizeof(int*)*N);
      head->count = 0;
      head->lastRow = N;
      //CREATE THE BOARD
      for(j=0; j<N; j++){
        head->b[j] = (int*)malloc(sizeof(int)*N);
        for(k=0; k<N; k++){
          fscanf( fp, "%d", &head->b[j][k]);
        }
      }

      /*********************************************/
      stack[tos++] = head;

      while(tos!=0){
        //POP TOS
        // printf("haha");
        head = stack[--tos];

        if(head->count == N){
          // boardString = (char *)malloc((N*N)*sizeof(char));
          // boardToString(head, N, boardString);
          // check = checkSolution(boardString, headNode);

            ++currNumOfSolutions;
            //insertFirst(boardString, &headNode);
            //printf("\nSolution found! %d\n", head->count);
            printBoard(head, N);
            free(head);
          //}
          continue;
        }

        row = head->lastRow-1;
        if(row < 0){
              free(head);
              continue;
        }
        for(col = N-1 ; col >= 0 ; col--){
            // printf("%d %d | ", row, col);
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
      printf("Current number of solutions: %i\n", currNumOfSolutions);
      currNumOfSolutions = 0;
      deleteAll(&headNode);
      //Delete solutions

    }
  }

  fclose(fp);

  return 0;
}
