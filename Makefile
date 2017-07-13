publish: 
	hugo
	gsutil rsync -R public gs://www.bergquist.eu

dev:
	hugo -w serve