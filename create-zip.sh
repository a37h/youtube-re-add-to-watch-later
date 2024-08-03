#!/bin/bash

# Create a temporary directory
temp_dir=$(mktemp -d)

# Copy relevant files to the temporary directory
cp manifest.json $temp_dir/
cp background.js $temp_dir/
cp main.js $temp_dir/
cp icon16.png $temp_dir/
cp icon48.png $temp_dir/
cp icon128.png $temp_dir/

# Create the zip archive
zip -j youtube-re-add-to-watch-later.zip $temp_dir/*

# Clean up the temporary directory
rm -rf $temp_dir

echo "Extension files have been zipped into youtube-re-add-to-watch-later.zip"
