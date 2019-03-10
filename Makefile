publish: 
	hugo
	firebase deploy

dev:
	hugo -w serve