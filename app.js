// let ul = document.getElementById('list')

// let requests = [];

// for(let i = 1; i < 5; i++){
//     requests.push(axios.get(`http://numbersapi.com/${3}/math`))
// }


// Promise.all(requests)
//     .then(values => {
//         for(let val of values){
//             addToPage(val.data)
//         }
//     })
//     .catch(err => {
//         console.log(err)
//     })

// function addToPage(data){
//     let p = document.createElement('p');
//     p.innerHTML = data;
//     ul.append(p);

// }
// let requests = [];

// axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     .then(val =>{
//         for(let i = 0; i < 2; i++){
//             requests.push(axios.get(`https://deckofcardsapi.com/api/deck/${val.data.deck_id}/draw/?count=1`));
//         }
//         let res = Promise.all(requests);
//         return res;
//     })
//     .then(values =>{
//         for(let val of values){
//             console.log(val.data.cards[0].suit, val.data.cards[0].value);
//         }
//     })


//Selectors & Values
let cardsContainer = document.getElementById('cards');
let newCardBtn = document.getElementById('new_card');
let deck_id = null;

//Initial request to load a new deck and store id in deck_id
axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(val =>{
        deck_id = val.data.deck_id;
    });

//Add even listener to load new card once button is clicked
newCardBtn.addEventListener('click', function(){
    axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        .then(val => {  
            if(val.data.cards[0]){
                loadCard(val);
            }else{
                alert('No more cards in deck!')
            }
        })
        .catch(err => {
            console.log(err);
        })
});

//function to add new card to page
function loadCard(val){
    //creates new div that has the card image inside with the style property set to a random rotation deg
    let newDiv = document.createElement('div');
    let newImg = document.createElement('img');
    
    let ranDeg = Math.floor(Math.random() * (75 - (-75)) + (-75));
    let ranTop = Math.floor(Math.random() * (40 - (-40)) + (-40));
    let ranLeft = Math.floor(Math.random() * (40 - (-40)) + (-40));

    newImg.setAttribute("src", `${val.data.cards[0].images.png}`);
    newDiv.append(newImg);
    newDiv.style.transform = `rotate(${ranDeg}deg)`;
    newDiv.classList.add('card');
    newDiv.style.left = `${ranLeft}px`;
    newDiv.style.top = `${ranTop}px`;

    cardsContainer.append(newDiv);
}













