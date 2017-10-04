import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Exercise1{

	private static void readFile(String filename)
	{
	  try(BufferedReader br = new BufferedReader(new FileReader(filename))) {
		    StringBuilder sb = new StringBuilder();
		    String line = br.readLine();

		    while (line != null) {
		        sb.append(line);
		        sb.append(System.lineSeparator());
		        line = br.readLine();
		    }
		    System.out.println(sb.toString());
		}
	}

	public static void main(String args []){
		Exercise1.readFile("file1.txt"");
		
		//Otra operación
	}

}