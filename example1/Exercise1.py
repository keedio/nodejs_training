import time

def printLines(fileName):
		lines = ''
		with open(fileName) as f:
			lines = f.readlines()

		print lines

if __name__ == "__main__":
	
	printLines('file1.txt')
	printLines('file2.txt')

	print sum(range(10))
	
	



	