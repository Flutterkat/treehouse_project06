const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const buttons = document.getElementsByTagName('button');
const ul = document.querySelector('ul');
const letterLength = document.getElementsByClassName('letter')
const show = document.getElementsByClassName('show');
const h2 = document.createElement('h2');
const btn_retry = document.createElement('a');
const retry = document.getElementsByClassName('.retry');
const tries = document.querySelectorAll('.tries');
let answer = '';
let missed = -1;
let letter = ul.children;
let phrases = ["Summer Nights", "Friends in Low Places", "All My Exs Live in Texas", "Going Through the Big D", "I Love This Bar"];


//removes all 'li' elements that make up phrase.
const removeChilds = () => {
    while (ul.lastChild) {
        ul.removeChild(ul.lastChild);
    }
};

//resets the on-screen keyboard back to default/start position.
const resetQwerty = () => {
    for (i = 0; i < buttons.length; i++)
    buttons[i].className = '';
}

//resets heart images back to default/start position.
const resetTries = () => {
    for (i = 0; i < tries.length; i++)
    tries[i].firstChild.src = 'images/liveheart.png';
}

//on click of retry button, resets the game after a player wins/loses using above functions.
//sets 'missed = -1' and hides overlay.
overlay.addEventListener('click', (e) => {
    if (e.target.className === 'btn__reset') {
    overlay.style.display = 'none';
    } else if (e.target.className === 'retry'){
        removeChilds();
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
        resetQwerty();
        resetTries();
        missed = -1;
        overlay.style.display = 'none';
        }
}); 

//passes 'phrases[]' array as an argument to generate a randomly chosen phrase
//Then slices it into its individual characters.
//returns new array of sliced characters.
    let phraseSelect = '';
    let getRandomPhraseAsArray = (argument) => {
    let rdmArray = Math.floor(Math.random() * 5);
    phraseSelect = argument[rdmArray];
    phraseSelect = phraseSelect.split('');
    return phraseSelect;
};


//takes sliced characters and generates an 'li' list appended to the 'ul'.
//sets class name based on if the character is a letter or a space.
function addPhraseToDisplay(argument) {
    for (i = 0; i<argument.length; i++) {
        const li = document.createElement('li');
        const ul = document.querySelector('ul');
        li.textContent = argument[i];
        ul.appendChild(li);
        if (argument[i] !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space'
        }
    }
};

//declares and then runs the two functions above passing the 1st(getRandomPhraseAsArray()) into the second (addPhraseToDisplay()).
//uses the 'const phrases[]' Array as the 1st argument.
let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


//takes the user input from the (qwerty) keyboard as an (argument).
//checks argument against the 'li' characters with a for loop.
//if correct, adds a className of 'show' to the 'li' or items.
//returns either null (if guess was incorrect), or the argument (user input from qwerty) as the answer. 
const checkLetter = (argument) => { 
    for (i=0; i<letter.length; i++) {
        if (argument === letter[i].textContent.toLowerCase()) {
            letter[i].classList.add('show');
            answer = argument;
        }
    }
        if (answer !== argument) {
            answer = null;
            return answer;
        } else {
            answer = argument;
            return answer;
        }
};


//listens for events on the qwerty buttons.
//passes the user input to the checkLetter() function.
//if checkLetter() returns null, increments the missed variable and updates the <img src> of hearts to track guesses.
//runs checkWin() after each guess.
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        checkLetter(e.target.textContent);
        let letterFound = answer;
        if (letterFound === null) {
            missed++;
            tries[missed].firstChild.src = 'images/lostheart.png';
        }
    }
    checkWin();
});

//loops to remove the <h2> and <a> elements from the overlay div.
const removeOverlayElements = () => {
    for(i=0; i<2; i++)
    overlay.children[0].remove()}

//creates new elements
//sets the class name
//sets inner HTML
const createElements = (element, className, text) => {
    element.className = className;
    element.innerHTML = text;}

//sets the 'win' or 'lose' class on overlay div.
//sets display on overlay div to 'flex', from 'none' after a win or lose condition is met.
const convertOverlay = (loseORwin) => {
    overlay.className = loseORwin;
    overlay.style.display = 'flex';}

//checks win conditions by comparing classes of 'li' elements. classes of show === classes of letter.
//removes overlay <h2> and <a> elements.
//inserts appropriate <h2> heading and <a> elements depending on win/lose.
//sets class of overlay to win or lose.
const checkWin = function () {
    if (show.length === letterLength.length) {
        removeOverlayElements();
        createElements(h2, 'winner', 'Congratz! You Win!');
        overlay.appendChild(h2);
        createElements(btn_retry, 'retry', 'Retry');
        overlay.appendChild(btn_retry);
        convertOverlay('win');
    } else if (missed === 4) {
        removeOverlayElements();
        createElements(h2, 'loss', 'Sorry, Try Again?');
        overlay.appendChild(h2);
        createElements(btn_retry, 'retry', 'Retry');
        overlay.appendChild(btn_retry)
        convertOverlay('lose');
        }
};