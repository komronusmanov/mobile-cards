UdaciCards Quiz Project:

To Install this project and launch through the emulator just 'npm install' it
and 'npm start' through Node.

Project have been tested on Android device through Expo XDE. For more information, please check following link:

Android device used for testing:

Samsung Galaxy S7 (Android 7.1.1)
SM-G930F

https://docs.expo.io/

Separated by several Views, App allows you to create, choose and pass a Quiz.

List of Views:

Home View:

Contains a Tab Navigator on bottom of the screen allowing you to switch between two options:

- either preview a list of available decks - DeckList;
- either create a new one of your preferences - AddDeck;

1. DeckList View:

DeckList is a screen where you can see all of decks available in this this App.

2. AddDeck:

AddDeck is a screen where you can a new Deck to DeckList.
There is an input text place where you can type prefered title of Deck.

3. Deck View:

Once clicked, any deck will navigate your View to Deck View, where you can see a title,
number of questions available in this Deck and also 2 buttons:

- Add Card (Navigates user to AddCard view)

- Start Quiz (Navigates user to Quiz view)

4. AddCard View:

A view where user should fill up a form to create a new Card and to deck,
first input is a question and second one is an answer. On submit creates a new card
and attaches it to deck.

5. Quiz View:

When pressed on Start Quiz button, Quiz will start.

On top you can see question Index followed up by total quantity of questions.

There is a Card displayed with 3 buttons:

- Show Answer / Show Question - toggles a view between Question and its answer
- Correct / Incorrect - gives user an opportunity to choose if answer is correct or not.

Once Quiz is done there is a message appearing on the screen with a total number of correct answers.
Also there are 2 buttons:

- Back to Deck - Navigates user to Deck.
- Reset Quiz - Resets quiz from the beginning.
