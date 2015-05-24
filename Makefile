start:
	./node_modules/.bin/nf start

service:
	./node_modules/.bin/nodemon

asset:
	./node_modules/.bin/webpack --watch

push:
	git push mick master

pull:
	git pull mick master
