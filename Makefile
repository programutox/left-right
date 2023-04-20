OUTPUT = left_right.zip

default:
	zip -r $(OUTPUT) assets scripts index.html

clean:
	rm $(OUTPUT)
