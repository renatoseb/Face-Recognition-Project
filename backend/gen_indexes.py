import api_functions
import sys


args = sys.argv[1:]
if len(args) == 2 and args[0] == '-t':
    for i in [-1]:#100,200,400,800,1600,3200,6400,12800,-1]:
        api_functions.generate_encodings(i, int(args[1]))
        api_functions.write_encodings(i, int(args[1]))


