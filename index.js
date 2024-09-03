let deck    = [];
const ts    = ['C','D','H','S'];
const lords = ['A','J','Q','K'];
let pointsPlayer = 0,
    pointsDealer = 0;

const btnTake = document.getElementById('btnTake');
const btnStop = document.getElementById('btnStop');
const btnNew  = document.getElementById('btnNew');

const cardsDealer = document.getElementById('cardsDealer');
const cardsPlayer = document.getElementById('cardsPlayer');

const pointsHTML  = document.querySelectorAll('small');

const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let t of ts) {
            // deck.push(i + 'C');
            deck.push(i + t);
        }
    }
    for(let t of ts) {
        for (let l of lords) {
            deck.push(l + t);
        }
    }
    deck = _.shuffle(deck);
    return deck;
}

createDeck();

const takeCard = () => {
    if (deck.length === 0) {
        throw new Error("There are not cards.");
    }
    const card = deck.pop();
    return card;
}

const valueCard = (card) => {
    const valueCard = card.substring(0, card.length - 1);
    let points = 0;
    if(isNaN(valueCard)) {
        points = (valueCard === 'A') ? 11 : 10;
    } else {
        points = valueCard + 1;
    }
    return points;
}

const spinDealer = (minPoints) => {
    do {
        const card = takeCard();

        pointsDealer += valueCard(card);
        pointsHTML[1].innerHTML = pointsDealer;

        const imgCard = document.createElement('img');
        imgCard.src = `img/${card}.png`;
        imgCard.classList.add('card');
        cardsDealer.append(imgCard);

        if(minPoints > 21) {
            break;
        }
    } while (
        (pointsDealer < minPoints) &&
        (minPoints <= 21)
    );

    setTimeout(() => {
        if(pointsDealer === minPoints) {
            alert('Noone win :(');
        } else if (minPoints > 21) {
            alert('Dealer win :(');
        } else if (pointsDealer > 21) {
            alert('Player win!');
        } else {
            alert('Dealer win :(');
        }
    }, 100);
}

btnTake.addEventListener('click', () => {
    const card = takeCard();

    pointsPlayer =+ valueCard(card);
    pointsHTML[0].innerHTML = pointsPlayer;

    const imgCard = document.createElement('img');
    imgCard.src = `img/${card}.png`;
    imgCard.classList.add('card');
    cardsPlayer.append(imgCard);

    if(pointsPlayer > 21 || pointsPlayer === 21) {
        btnTake.disabled = true;
        btnStop.disabled = true;
        spinDealer(pointsPlayer);
    }
});

btnStop.addEventListener('click', () => {
    btnTake.disabled = true;
    btnStop.disabled = true;
    spinDealer(pointsPlayer);
});

btnNew.addEventListener('click', () => {
    deck = [];
    deck = createDeck();

    pointsDealer = 0;
    pointsPlayer = 0;

    pointsHTML[0].innerHTML = 0;
    pointsHTML[1].innerHTML = 0;

    cardsDealer.innerHTML = '';
    cardsPlayer.innerHTML = '';

    btnTake.disabled = true;
    btnStop.disabled = true;
});