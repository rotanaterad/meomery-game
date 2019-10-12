/*
 * Create a list that holds all of your cards
 */


var card = [];
let element=[];
var cardSymbol = ['diamond','diamond','paper-plane-o','paper-plane-o','anchor','anchor','bolt','bolt','cube','cube','leaf','leaf','bicycle','bicycle','bomb','bomb'];
var openlist=[];
var opencount=0;
var matchlist=[];
var matchcount=0;
var movecount=0;
let totalSeconds = 0;
let timeInt = 0;
let timestart=0;
let startcount=3;


let deck = document.querySelector('.deck');
let moves = document.querySelector('.moves');
let startlist=document.querySelector('.stars');
let timer = document.querySelector('.timer');
let modal = document.querySelector('.modal');
let modalcontent = document.querySelector('.modal-content');
//add event listner to restart icon and call reset function
const restart = document.getElementsByClassName(`fa-repeat`);
restart[0].addEventListener(`click`, reset);

window.onload=startgame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;

}

function startgame(){
 //shuffle the list of cards using the provided "shuffle" method
  cardSymbol=shuffle(cardSymbol);
  // loop through each card and create its HTML
  //  add each card's HTML to the page
  for (let i = 0; i < cardSymbol.length; i++) {
    card[i] = document.createElement('li');
    card[i].setAttribute('class', 'card');
    element[i] = document.createElement('i');
    element[i].setAttribute('class','fa fa-' + cardSymbol[i] );
    card[i].appendChild(element[i]);
    deck.appendChild(card[i]);
  }
  showcard();
  playgame();
}



function showcard(){
  //function to display the card symbol alittle time then hide all
setTimeout(function(){
  for(let i=0;i<card.length;i++){
  card[i].classList.add('open','show','flip');
}
},500);

setTimeout(function(){
  for(let i=0;i<card.length;i++){
  card[i].classList.remove('open','show','flip');
}
},2000);
}



function playgame(){
// set up the event listener for a card. If a card is clicked:
// 1-display the card's symbol and start timer
// 2-add the card to a open list array
// 3-if the list already has another card, check to see if the two cards match or not
//      if two cards are match call match function
//      else call nomatch function
  for(let i=0;i<card.length;i++){
  card[i].addEventListener('click',function displaysymbol(event){
    if(timestart==0){
      timeInt = setInterval(startTimer, 1000);
      timestart++;
    }
      let temp=event.target;
      temp.classList.add('open','show');
      openlist[opencount]=(temp);
      opencount++;
      if (openlist.length==2){
        movecounter();
        let card1=openlist[0].innerHTML;
        let card2=openlist[1].innerHTML;
     if(card1==card2){
       match();
     }
     else{
       notmatch();
     }
   }
  });
}
}
//*****************************************************
function match(){
  //add match class to the two cards to make it green
  // and insert the two card to match list array
  //and increment matchcount
  for(let i=0;i<openlist.length;i++){
    openlist[i].classList.add('match');
    matchlist[matchcount]=openlist[i];
    matchcount++;
    if(matchcount==16){
      stopTimer();
      // if match counter = 16 cards then stop timer and finshgame
      setTimeout(function() {
    return finishgame();}, 700 );
    }
  }
  // remove the two cards from open list array
  // and reset the open list array and opencount
for(let i=0;i<openlist.length;i++){
  delete openlist[i];
}
openlist.length = 0;
opencount=0;
}



function notmatch(){
//add nomatch class to the two cards to make it red
    for(let i=0;i<openlist.length;i++){
    openlist[i].classList.add('notmatch');
   }
// remove open,show,notmatch class from two cards after one seconed
setTimeout(function(){
  for(let i=0;i<openlist.length;i++){
  openlist[i].classList.remove('open','show','notmatch');
}
},1000);
// remove the two cards from open list array
// and reset the open list array  and opencount after remove open,show,notmatch class from two cards
setTimeout(function(){
for(let i=0;i<openlist.length;i++){
  delete openlist[i];
}
openlist.length = 0;
opencount=0;
},1020);

}
//*****************************************************
function movecounter(){
  // increment the move counter and display it on the page
  movecount++;
  moves.innerHTML=movecount;
//rating start debend on movecount
  var children = startlist.children;
if(movecount>8&&movecount<13){
  children[0].setAttribute('style', 'visibility:hidden');
  startcount=2;
}else if (movecount>13&&movecount<18) {
  children[1].setAttribute('style', 'visibility:hidden');
  startcount=1;
}else if(movecount>18){
children[2].setAttribute('style', 'visibility:hidden');
startcount=0;
}
}
//******************************************************
function startTimer(){
    ++totalSeconds;
    function addZero(i) {
        return (i < 10) ? `0` + i : i;
    }
    let min = addZero(Math.floor(totalSeconds/60));
    let sec = addZero(totalSeconds - (min*60));
    timer.innerHTML = `${min}:${sec}`;
}

function stopTimer(){
    clearInterval(timeInt);
}
//*****************************************************
function finishgame(){
modalcontent.innerHTML =
        `<h2 > Congratulations! </h2>
        <h3 > you are winning! </h3>
        <p>${movecount} moves </p>
        <p> ${timer.innerHTML} total time </p>
        <p> ${startcount} stars </p>
        <button class="modalbutton" > Play Again </button><button class="close" > close </button>`;

  const playagin = document.querySelector('.modalbutton');
  playagin.addEventListener(`click`,function() {
    modal.style.display ="none";
    reset();
  });
  let closebutton = document.querySelector('.close');
  closebutton.addEventListener(`click`,function() {
    modal.style.display ="none";
  });
modal.style.display = "block";
}
//*****************************************************

function reset() {

    card = [];
    element=[];
    openlist = [];
    opencount=0;
    matchlist = [];
    matchcount=0;
    movecount=0;

    resetTimer();
    resetCounter();
    resetStars();
    clearDeck();

    startgame();


}

function clearDeck() {
  deck.innerHTML = '';
}

function resetTimer(){
    clearInterval(timeInt);
    totalSeconds = 0;
    timestart=0;
    timer.innerHTML = `00:00`;
}

function resetCounter() {
    moves.innerHTML = '0';
    movecount = 0;
}
function resetStars() {
    var children = startlist.children;
    for (let i=0; i<3; i++){
      children[i].setAttribute('style', 'visibility:visible');
    }
    startcount=3;
}
