
var wordGuessGame = {
  wordsToPick: {
    narcissistic: {
    },
    transphobic: {
    },
    egotistical: {
    },
    racist: {
    },
    unqualified: {
    },
    sexist: {
    },
    bigoted: {
    },
    taxes: {
    },
    immigrants: {
    },
    covfefe: {
    },
    emolument: {
    },
    wall: {
    },
    conservative: {
    },
    russia: {
    },
    complicit: {
    },
    collusion: {
    }
  },

  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,


  setupGame: function() {

    var objKeys = Object.keys(this.wordsToPick);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];


    this.lettersOfTheWord = this.wordInPlay.split("");
    this.rebuildWordView();
    this.processUpdateTotalGuesses();
    document.getElementById("image").innerHTML = '<img src="assets/images/base1.jpg" height="500">';

  },

  updatePage: function(letter) {
    if (this.guessesLeft === 0) {
      this.restartGame();
      alert("You may have lost the round, but you've succeeded at something greater...");
    }
    else {
      this.updateGuesses(letter);
      this.updateMatchedLetters(letter);
      this.rebuildWordView();
      if (this.updateWins() === true) {
        this.restartGame();
      }
    }

  },

  updateGuesses: function(letter) {
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

      this.guessedLetters.push(letter);
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

      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML =
      this.guessedLetters.join(", ");

    }
  
  },

  processUpdateTotalGuesses: function() {
    this.totalGuesses = 8;
    this.guessesLeft = this.totalGuesses;

    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  updateMatchedLetters: function(letter) {
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        this.matchedLetters.push(letter);
      }
    }
  },

  rebuildWordView: function() {
    var wordView = "";

    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
        wordView += this.lettersOfTheWord[i];
      }
      else {
        wordView += "&nbsp;_&nbsp;";
      }
    }

    document.querySelector("#current-word").innerHTML = wordView;
  },

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

  updateWins: function() {
    var win;
    if (this.matchedLetters.length === 0) {
      win = false;
    } else {
      win = true;
    }

    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false;
      }
    }

    if (win) {

      this.wins = this.wins + 1;
      document.querySelector("#wins").innerHTML = this.wins;
      document.getElementById("image").innerHTML = '<img src="assets/images/base1.jpg" height="500">';
      return true;
    }
    return false;
  }
};

wordGuessGame.setupGame();

document.onkeyup = function(event) {
  wordGuessGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
  wordGuessGame.updatePage(wordGuessGame.letterGuessed);
};
