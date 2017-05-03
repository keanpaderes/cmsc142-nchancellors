from subprocess import call

call("./a.out")
output = open("output.txt", "r")
string = ""
solutions = []
for line in output:
    if '=' in line:
        solutions.append(string)
        string = ""
    else:
        string+=line.strip() + " "

for sol in solutions:
    print(sol)
output.close
