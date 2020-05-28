//* ES5 implementation
const TypeWriter = function (textElement, words, wait = '3000') {
  this.textElement = textElement;
  this.words = words;
  this.text = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//* Type Method
TypeWriter.prototype.type = function () {
  //current index of word
  const current = this.wordIndex % this.words.length;

  //get full text of current word
  const fullText = this.words[current];

  //check if deleting
  if (this.isDeleting) {
    // remove char
    this.text = fullText.substring(0, this.text.length - 1);
  } else {
    // add char
    this.text = fullText.substring(0, this.text.length + 1);
  }

  // insert text into element
  this.textElement.innerHTML = `<span class="text">${this.text}<span/>`;

  // initial type speed
  let typeSpeed = 500;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  if (!this.isDeleting && this.text === fullText) {
    // make pause at end
    typeSpeed = this.wait;

    //set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.text === '') {
    this.isDeleting = false;

    // move to the next word
    this.wordIndex++;

    //pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

//* Init on DOM Load
//document.addEventListener('DOMContentLoaded', initialize);

//* Init App
function initialize(elementId, wordList) {
  const textElement = document.getElementById(elementId);
  const words = JSON.parse(wordList);
  const wait = textElement.getAttribute('data-wait');

  //* Initialize TypeWriter
  new TypeWriter(textElement, words, wait);
}
