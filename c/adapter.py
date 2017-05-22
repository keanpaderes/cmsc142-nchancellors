import sys
import subprocess

output = open(sys.argv[1]+"/output.txt", "r+")
string = ""
solutions = []
for line in output:
    if '=' in line:
        solutions.append(string.rstrip(","))
        string = ""
    else:
        string+=line.strip() + ","

for sol in solutions:
    print(sol)

output.close()
