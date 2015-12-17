Assignment #7
Author: Josh Audibert
Link: https://ja-cs4241-assignment7.herokuapp.com

Design Choices:
I chose for this assignment's theme to be minimalistic and modern. I desided to go with a light green and dark red theme because it's that time of year and they are complimentary. I wanted the grids to read like a forum of images. Actually, if you step back from your monitor and squint, you can see images using the 100 large pixels that are the colored cells of the grids. You need some imagination for this, however.

Technical Achievement:
I really like colors and squares apparently, so I decided to use templates to organize these colored boxes. It would be relatively easy to change the number of rows or columns in each color grid, as well as the number of color grids shown. Each grid has a title that was randomly generated but I wanted it to be pronouncable so they are always 7 characters long with alternating consonants and vowels and starting with a consonant. These sections are similar to "posts" on a forum, as there is a title and an image (grid of rows of colored cells). I originally had a Python script that wrote to the colors.txt and titles.txt files with the random colors and random titles. However, I wanted to be able to refresh these random values on command, so I moved it onto the server and added a button and GET request.

Note: The "<script src="http://underscorejs.org/underscore-min.js"> </script>" was giving me errors with Heroku, so I put the file directly in. It had something to do with using http instead of https, but I couldn't figure it out. It works now at least.