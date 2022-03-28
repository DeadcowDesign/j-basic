# j-basic
BASIC interpreter implementation in vanilla JavaScript

## Introduction
This is my JavaScript BASIC interpreter. There are many like it, but this one is mine.
I've taken some of the lessons from here:

https://www.codeproject.com/Articles/345888/How-to-write-a-simple-interpreter-in-JavaScript

To learn how to architect the nuts and bolts of an interpreter.

## In a nutshell
This system takes all the code that is entered into the input field and splits
it into tokens by looping through each line character by character (the Lexer). The result is an array of all the operations, variables, so on, required to run the program. This is then fed into the Parser, which determines how to
deal with each of the tokens built by the lexer.