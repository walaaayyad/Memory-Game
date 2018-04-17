/*
 *-----------------------------------------
        **** VARIABLES ****
 *-----------------------------------------
 */ 


 let cards=[
      "fa-diamond",
      "fa-paper-plane-o",
      "fa-anchor",
      "fa-bolt",
      "fa-cube",
      "fa-anchor",
      "fa-leaf",
      "fa-bicycle",
      "fa-diamond",
      "fa-bomb",
      "fa-leaf",
      "fa-bomb",
      "fa-bolt",
      "fa-bicycle",
      "fa-paper-plane-o",
      "fa-cube"],
    shuffleCard=[], 
    openedCards = [],
    matched=[],
    deck = document.querySelector('.deck'),
    restart = document.querySelector('.restart'),
    moves = document.querySelector('.moves'),
    scorePanel = document.querySelector('.score-panel'),
    time = document.querySelector('#timer'),
    seconds = document.querySelector('.seconds'),
    minutes = document.querySelector('.minutes'),
    card = $('.deck li'),
    oneStar = $('.one'),
    twoStars = $('.two');
/*  
*--------------------------------------------------------
*  Time from: https://albert-gonzalez.github.io/easytimer.js/
*--------------------------------------------------------
*/
var timer = new Timer();
 card.click(function () {
    timer.start();
});

timer.addEventListener('secondsUpdated', function (e) {
    $('#timer .minutes').html(timer.getTimeValues().minutes);
    $('#timer .seconds').html(timer.getTimeValues().seconds);
    if(matched.length === 16){
      timer.stop();
    }
    
});


/*
*----------------------------------------------------
       ***** DISPLAY THE CARDS  *****
*----------------------------------------------------
*/
  card.on('click',function(){
    this.classList.add('open','show','disable');
  console.log(this.className);
  openedCards.push(this);
  console.log(openedCards);
  if(openedCards.length === 2){
    check(openedCards);

}
})
/*
*
  -----------------------------------------------------------------------
    *** Check function to compare if two cards matched or unmatched. ***
  -----------------------------------------------------------------------
*
*/

function check(card){
    if(openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className){ 
      setTimeout(function() {
    openedCards[0].classList.add('match');
    openedCards[1].classList.add('match');
    matched.push(openedCards[0]);
    matched.push(openedCards[1]);
  console.log(matched);
if(matched.length === 16){endMsg();};

    openedCards = [];

  }, 500);
 }else{
     setTimeout(function() {
   openedCards[0].classList.remove('open','show','disable');
   openedCards[1].classList.remove('open','show','disable');
     openedCards = [];
          }, 300);
 }
  moves.innerHTML++;

  //stars disappear when moves increase.

  if(moves.innerHTML >= 1 && moves.innerHTML <= 10){
    console.log('three stars');
  }else if(moves.innerHTML > 10 && moves.innerHTML <= 16){
  oneStar.css('visibility', 'hidden');
    }else{
  twoStars.css('visibility', 'hidden'); 
  
    }
}
/*
*
  ----------------------------
     *** Rating Function ***
  ----------------------------
*
*/
function rating(num){
  let starsNo= 3;
  if(num >= 16){
    starsNo= 1;
}else if(num >= 10){
  starsNo= 2;
  }else{
    starsNo= 3;
  }
  return('You Get '+starsNo+' star');
}
/*
*
  -----------------------------------
    *** Popup Message at the end  ***
  -----------------------------------
*
*/

function endMsg(){
let msg= rating(moves.innerHTML);

   swal({
   title: "Good job !  "+msg,
  text: "  ("+ moves.innerText+") moves   in "+minutes.innerText+" Minutes and "+seconds.innerText+"  Seconds",
   icon: "success",
  button: "restart",

  });
}
  
/*
*
  ------------------------------------------------------------------
    *** Shuffle function from http://stackoverflow.com/a/2450976 ***
  ------------------------------------------------------------------
*
*/

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
 


/*
*  ----------------------------------------------
      ***  start function to reset the cards.  ***
   ----------------------------------------------
*

function reset(){

  $('.deck').empty();
  moves.innerHTML=0;
  timer.reset();
  shuffleCard = shuffle(cards);
  for(let i = 0; i < shuffleCard.length; i++){
    $('.deck').append('<li class="card"><i class="'+ shuffleCard[i] +'"</li>');
  }
}

restart= reset();
*/

// ---------------------------------------------------------------------------------------------------------
//restart.addEventListener('click', start);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you 
 call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality 
 in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol
  (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another 
 function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality 
 in another function that you call from this one)
 */
