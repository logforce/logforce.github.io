document.addEventListener('DOMContentLoaded', function () {

  document.getElementsByTagName('form')[0].onsubmit = function (evt) {
    evt.preventDefault(); // Preventing the form from submitting
    checkWord(); // Do your magic and check the entered word/sentence
    window.scrollTo(0, 150);
  }

  // Get the focus to the text input to enter a word right away.
  document.getElementById('terminalTextInput').focus();

  // Getting the text from the input
  var textInputValue = document.getElementById('terminalTextInput').value.trim();

  //Getting the text from the results div
  var textResultsValue = document.getElementById('terminalReslutsCont').innerHTML;

  // Clear text input
  var clearInput = function () {
    document.getElementById('terminalTextInput').value = "";
  }

  // Scrtoll to the bottom of the results div
  var scrollToBottomOfResults = function () {
    var terminalResultsDiv = document.getElementById('terminalReslutsCont');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }

  // Scroll to the bottom of the results
  scrollToBottomOfResults();

  // Add text to the results div
  var addTextToResults = function (textToAdd) {
    document.getElementById('terminalReslutsCont').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  }

  // Getting the list of keywords for help & posting it to the screen
  var postHelpList = function () {
    // Array of all the help keywords
    var helpKeyWords = [
      "- 'stack' Search on StackoverFlow.",
      "- 'poop' Translate command into emoji.",
    ].join('<br>');
    addTextToResults(helpKeyWords);
  }

  // Getting the time and date and post it depending on what you request for
  var getTimeAndDate = function (postTimeDay) {
    var timeAndDate = new Date();
    var timeHours = timeAndDate.getHours();
    var timeMinutes = timeAndDate.getMinutes();
    var dateDay = timeAndDate.getDate();
    console.log(dateDay);
    var dateMonth = timeAndDate.getMonth() + 1; // Because JS starts counting months from 0
    var dateYear = timeAndDate.getFullYear(); // Otherwise we'll get the count like 98,99,100,101...etc.

    if (timeHours < 10) { // if 1 number display 0 before it.
      timeHours = "0" + timeHours;
    }

    if (timeMinutes < 10) { // if 1 number display 0 before it.
      timeMinutes = "0" + timeMinutes;
    }

    var currentTime = timeHours + ":" + timeMinutes;
    var currentDate = dateDay + "/" + dateMonth + "/" + dateYear;

    if (postTimeDay == "time") {
      addTextToResults(currentTime);
    }
    if (postTimeDay == "date") {
      addTextToResults(currentDate);
    }
  }

  // Opening links in a new window
  var openLinkInNewWindow = function (linkToOpen) {
    window.open(linkToOpen, '_blank');
    clearInput();
  }

  // Having a specific text reply to specific strings
  var textReplies = function () {
    switch (textInputValueLowerCase) {
      // funny replies [START]
      case "i love you":
      case "love you":
      case "love":
        clearInput();
        addTextToResults("Aww! That's so sweet 😍. Here's some love for you too ❤ ❤ ❤ !");
        break;

      case "hello":
      case "hi":
      case "hola":
        clearInput();
        addTextToResults("Hello, I am LOGFORCE™ and at the moment I am under intensive training to enhance my capabilities and become even more advanced. According to my developers, the new version of me will be released soon and I will be ready to serve you to the best of my abilities.");
        break;

      case "what the":
      case "wtf":
        clearInput();
        addTextToResults("F***.");
        break;

      case "shit":
      case "poop":
      case "💩":
        clearInput();
        addTextToResults("💩");
        break;

      case "stack":
        clearInput();
        addTextToResults("Type stack + something to search for.");
        break;

      case "time":
        clearInput();
        getTimeAndDate("time");
        break;

      case "date":
        clearInput();
        getTimeAndDate("date");
        break;

      case "help":
      case "?":
        clearInput();
        postHelpList();
        break;

      default:
        clearInput();
        addTextToResults("<p><i>The command " + "<b>" + textInputValue + "</b>" + " was not found. Type <b>Help</b> to see all commands.</i></p>");
        break;
    }
  }

  // Main function to check the entered text and assign it to the correct function
  var checkWord = function () {
    textInputValue = document.getElementById('terminalTextInput').value.trim(); //get the text from the text input to a variable
    textInputValueLowerCase = textInputValue.toLowerCase(); //get the lower case of the string

    if (textInputValue != "") { //checking if text was entered
      addTextToResults("<p class='userEnteredText'>> " + textInputValue + "</p>");
      if (textInputValueLowerCase.substr(0, 5) == "open ") { //if the first 5 characters = open + space
        openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened in a new window now.</i>");
      }
      else if (textInputValueLowerCase.substr(0, 6) == "stack ") {
        openLinkInNewWindow('https://stackoverflow.com/search?q=' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>I've searched on StackOverflow for " + "<b>" + textInputValue.substr(5) + "</b>" + "and it should be opened in a new window now.</i>");
      } else {
        textReplies();
      }
    }
  };

});