#!/bin/sh -eu

BABEL="./node_modules/.bin/babel"

[ -d "dist" ] && rm -r "dist"

mkdir -p "dist/lib/api"

compile_dir() {
	for file in src/$1/*; do
		filename=$(basename "$file")

		if [ -f "src/$1/$filename" ]; then
			printf "Compiling src/$1/$filename -> dist/$1/$filename"
			$BABEL "src/$1/$filename" > "dist/$1/$filename"
			echo " ... ok"
		fi
	done
}

compile_dir "."
compile_dir "lib"
compile_dir "lib/api"
