object Exercise1 {
   import scala.io.Source

   def printLines(filename: String){
	for (line <- Source.fromFile(filename).getLines) {
	   		println(line)
	   }
   }

   def main(args: Array[String]) {
        printLines("file1.txt")
        printLines("file2.txt")

        println(Array.range(0, 10) reduceLeft { _ + _ })
    }

}