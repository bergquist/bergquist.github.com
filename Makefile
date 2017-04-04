publish: 
	hugo
	gsutil rsync -R public gs://www.bergquist.eu
