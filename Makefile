OUTPUT = left_right_web.zip

default:
	zip -r $(OUTPUT) assets scripts index.html

clean:
	rm $(OUTPUT)
