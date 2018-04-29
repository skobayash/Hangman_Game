// Creating a giant wordGuessGame object that will house all of our logic and variables.
var wordGuessGame = {

  // Object of all words that can be chosen, along with info such as their picture and a song clip.

  wordsToPick: {
    narcissistic: {
      song: "#"
    },
    transphobic: {
      song: "#"
    },
    egotistical: {
      song: "#"
    },
    racist: {
      song: "#"
    },
    unqualified: {
      song: "#"
    },
    sexist: {
      song: "#"
    },
    bigoted: {
      song: "#"
    },
    taxes: {
      song: "#"
    },
    immigrants: {
      song: "#"
    },
    covfefe: {
      song: "#"
    },
    emolument: {
      song: "#"
    },
    wall: {
      song: "#"
    },
    conservative: {
      song: "#"
    },
    russia: {
      song: "#"
    },
    complicit: {
      song: "#"
    }
  },

  // Variables that set the initial state of our wordGuess game.
  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

  // The setupGame method is called when the page first loads.
  setupGame: function() {
    // Here we pick a random word.
    var objKeys = Object.keys(this.wordsToPick);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

    // Split the chosen word up into its individual letters.
    this.lettersOfTheWord = this.wordInPlay.split("");
    // Builds the representation of the word we are trying to guess and displays it on the page.
    // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
    this.rebuildWordView();
    // This function sets the number of guesses the user gets, and renders it to the HTML.
    this.processUpdateTotalGuesses();
    document.getElementById("image").innerHTML = '<img src="assets/images/base1.jpg" height="500">';

  },

  // This function is run whenever the user guesses a letter..
  updatePage: function(letter) {
    // If the user has no guesses left, restart the game.
    if (this.guessesLeft === 0) {
      this.restartGame();
    }
    // Otherwise...
    else {
      // Check for and handle incorrect guesses.
      this.updateGuesses(letter);

      // Check for and handle correct guesses.
      this.updateMatchedLetters(letter);

      // Rebuild the view of the word. Guessed letters are revealed, non-guessed letters have a "_".
      this.rebuildWordView();

      // If the user wins, restart the game.
      if (this.updateWins() === true) {
        this.restartGame();
      }
    }

  },

  // This function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
  updateGuesses: function(letter) {
    // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

      // Add the letter to the guessedLetters array.
      this.guessedLetters.push(letter);

      // Decrease guesses by one.
      this.guessesLeft--;
      if (this.guessesLeft == 7) {
        document.getElementById("image").innerHTML = '<img src="assets/images/base2.jpg" height="500">';
      } else if (this.guessesLeft == 6) {
          document.getElementById("image").innerHTML = '<img src="assets/images/base3.jpg" height="500">';
      } else if (this.guessesLeft == 5) {
        document.getElementById("image").innerHTML = '<img src="assets/images/base4.jpg" height="500">';
      } else if (this.guessesLeft == 4) {
        document.getElementById("image").innerHTML = '<img src="assets/images/base5.jpg" height="500">';
      } else if (this.guessesLeft == 3) {
        document.getElementById("image").innerHTML = '<img src="assets/images/base6.jpg" height="500">';
      } else if (this.guessesLeft == 2) {
        document.getElementById("image").innerHTML = '<img src="assets/images/base7.jpg" height="500">';
      } else if (this.guessesLeft == 1) {
        document.getElementById("image").innerHTML = '<img src="assets/images/base8.jpg" height="500">';
      } else if (this.guessesLeft == 0) {
        document.getElementById("image").innerHTML = '<img src="assets/images/base9.jpg" height="500">';
      }

      // Update guesses remaining and guesses letters on the page.
      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML =
      this.guessedLetters.join(", ");

    }
  
  },

  // This function sets the initial guesses the user gets.
  processUpdateTotalGuesses: function() {
    // The user will get more guesses the longer the word is.
    this.totalGuesses = 8;
    this.guessesLeft = this.totalGuesses;

    // Render the guesses left to the page.
    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  // This function governs what happens if the user makes a successful guess.
  updateMatchedLetters: function(letter) {
    // Loop through the letters of the "solution".
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      // If the guessed letter is in the solution, and we haven't guessed it already..
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        // Push the newly guessed letter into the matchedLetters array.
        this.matchedLetters.push(letter);
      }
    }
  },

  // This function builds the display of the word that is currently being guessed.
  // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
  rebuildWordView: function() {
    // We start with an empty string.
    var wordView = "";

    // Loop through the letters of the word we are trying to guess..
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      // If the current letter has been guessed, display that letter.
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
        wordView += this.lettersOfTheWord[i];
      }
      // If it hasn't been guessed, display a "_" instead.
      else {
        wordView += "&nbsp;_&nbsp;";
      }
    }

    // Update the page with the new string we built.
    document.querySelector("#current-word").innerHTML = wordView;
  },

  // Function that "restarts" the game by resetting all of the variables.
  restartGame: function() {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.wordInPlay = null;
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.setupGame();
    this.rebuildWordView();
    document.getElementById("image").innerHTML = '<img src="assets/images/base1.jpg" height="500">';
  },

  // Function that checks to see if the user has won.
  updateWins: function() {
    var win;

    // this won't work for words with double or triple letters
    // var lettersOfTheWordClone = this.lettersOfTheWord.slice(); //clones the array
    // this.matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')

    // If you haven't correctly guessed a letter in the word yet, we set win to false.
    if (this.matchedLetters.length === 0) {
      win = false;
    }
    // Otherwise, we set win to true.
    else {
      win = true;
    }

    // If a letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false.
    // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false;
      }
    }

    // If win is true...
    if (win) {

      // Increment wins.
      this.wins = this.wins + 1;

      // Update wins on the page.
      document.querySelector("#wins").innerHTML = this.wins;

      // Update the song title and band on the page.
      document.querySelector("#image").innerHTML = this.wordsToPick[this.wordInPlay].song +
      " By " + this.wordInPlay;

      // Update the image of the band on the page.
      document.querySelector("#bandDiv").innerHTML =
        "<img class='band-image' src='../images/" +
        this.wordsToPick[this.wordInPlay].picture + "' alt='" +
        this.wordsToPick[this.wordInPlay].song + "'>";

      // Play an audio track of the band.
      var audio = new Audio(this.wordsToPick[this.wordInPlay].preview);
      audio.play();

      // return true, which will trigger the restart of our game in the updatePage function.
      return true;
    }
    // If win is false, return false to the updatePage function. The game goes on!
    return false;
  }
};

// Initialize the game when the page loads.
wordGuessGame.setupGame();

// When a key is pressed..
document.onkeyup = function(event) {
  // Capture pressed key and make it lowercase.
  wordGuessGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
  // Pass the guessed letter into our updatePage function to run the game logic.
  wordGuessGame.updatePage(wordGuessGame.letterGuessed);
};
