import levenstein

# print(levenstein.minimumEditDistance("bello", "hello"))
# Open the file with read only permit
f = open('dialogue.txt', "r")
# use readlines to read all lines in the file
# The variable "lines" is a list containing all lines in the file
#lines = f.readlines()
#print(lines)
#removes \n from the end
#lines = [line.rstrip('\n') for line in open('dialogue.txt', "r")]
#print(lines)

dictionary = {'start' : 'Hey All'}
humanSpeech = "thank you cozmo"; #hello #captured using speech api
pair = ''

#created dictionary from the textfile
while True:
    # read line
    line = f.readline()

    # check if line is not empty
    if not line:
        break

    #strip out the \n at the end
    l1=line.rstrip('\n')

    #split by ":"
    l2=l1.split(":")
    #print(l2)

    if l2[0] == 'human':
        key = l2[1]
    else:
        pair = l2[1];
        dictionary[key] = pair

#print(dictionary)
#match with humanSpeech
#print(levenstein.minimumEditDistance('thank you cozmo', 'thank you Cosmo'))
for k, v in dictionary.items():
    if levenstein.minimumEditDistance(humanSpeech, k) < 5:
        print(v)
# close the file after reading the lines.
f.close()