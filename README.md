# Flashcard App

My first project in TripleTen's AI-Assisted Software
Engineering program. It includes decks of flashcards,
each of which can be viewed in a carousel.

## Features

## Technologies used

## Deployed Site

Check out [this site] (https://lf808mlb.github.io/ai-se_project_flashcards/) on GitHub Pages.

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/1CcOMC7hwVWGYhjdJwARK5SphoJkhOagJ/view?usp=sharing), where I describe my
project and some challenges I faced while building it.

## Project 1 Parts 4 and 5

In these two parts of the project, I first implemented a deck view, where clicking on a deck from the home page opens up a deck view with all the cards in the deck laid out. From the deck view, clicking on a card then opened it up into a carousel view.

Next, a CSS sheet was created for each BEM block, to help keep things organized and easier to navigate through.

Refactoring a couple of BEM blocks were necessary because of the deck view being implemented.

Making sure the cards rendered in the appropriate view needed to be done, as well as making sure buttons (flip, delete, practice) worked.

When implementing responsive design, a media query was included in order for the Flashcard Project to be functional (clean and uesr-friendly) on smaller devices, and styling was done to match the design provided in Figma, including adjusting linear gradient, box shadowing and z-index properties to give necessary items priority in certain views.

[GitHub Pages link] (https://github.com/LF808mlb/ai-se_project_flashcards.git)

## Project 1 Parts 6, 7, 8 and 9

In these four parts of the project, I implemented a new deck feature; accessed from the home page of the site, there is a button for users to create their own new deck of flashcards. This new deck section allows users to select the color they want to apply to their new deck (from a color picker) and upload their flashcard text in JSON format. If their textarea is not formatted properly, I implemented for errors to display an error message via a modal. The error message modal was also styled following a Figma design.

Next, interaction with a database via a remote API was implemented, in order to access data to populate the flashcards. This also allows for something like deleting cards/decks to be deleted permanently, where these cards/decks are not repopulated upon refreshing of the website.

Lastly, for each function in every js files, JSDoc descriptions were added.

GitHub Pages link: https://github.com/LF808mlb/ai-se_project_flashcards.git

## Project Pitch Videos

Check out these videos, where I describe my project and some challenges I faced while building it:

- [Project 1 Parts 4 & 5 Video](https://drive.google.com/file/d/1CcOMC7hwVWGYhjdJwARK5SphoJkhOagJ/view?usp=sharing)
- [Project 1 Parts 6 - 9 Video](https://drive.google.com/file/d/198ltgInECA0aLD7kGEH0aCGtMMqfOjSM/view?usp=sharing)
