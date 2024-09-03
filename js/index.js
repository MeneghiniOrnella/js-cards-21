const myModule = (() => {
    'use strict';

    let deck    = [];
    const ts    = ['C','D','H','S'],
        lords = ['A','J','Q','K'];

    let pointsPlayer = 0,
        pointsDealer = 0;

    const btnTake = document.getElementById('btnTake'),
          btnStop = document.getElementById('btnStop'),
          btnNew  = document.getElementById('btnNew');

    const cardsDealer = document.getElementById('cardsDealer'),
          cardsPlayer = document.getElementById('cardsPlayer');

    const pointsHTML  = [
        document.getElementById('playerPoints'),
        document.getElementById('dealerPoints')
    ];

    const initGame = (numPlayers = 2) => {
        deck = createDeck();

        pointsPlayer = [];
        for(let i = 0; i < numPlayers; i++) {
            pointsPlayer.push(0);
        }

        pointsHTML.forEach(lord => lord.innerText = 0);
        cardsPlayer.forEach(lord => lord.innerHTML = '');

        btnTake.disabled = false;
        btnStop.disabled = false;
    }

    const createDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let t of ts) {
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

    const takeCard = () => {
        if (deck.length === 0) {
            throw new Error("There are no cards.");
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
            points = parseInt(valueCard);
        }
        return points;
    }

    const addPoints = (card, spin) => {
        pointsPlayer[spin] += valueCard(card);
        pointsHTML[spin].innerText = pointsPlayer[spin];
        return pointsPlayer[spin];
    }

    const createCard = (card, spin) => {
        const imgCard = document.createElement('div');
        imgCard.className = 'card';
        const paragraph = document.createElement('p');
        paragraph.textContent = `${card}`;
        imgCard.appendChild(paragraph);
        cardsDealer.append(imgCard);
    }

    const whoWin = () => {
        const [minPoints, pointsDealer] = pointsPlayer;

        setTimeout(() => {
            if(pointsDealer === minPoints) {
                alert('No one wins :(');
            } else if (minPoints > 21) {
                alert('Dealer wins :(');
            } else if (pointsDealer > 21) {
                alert('Player wins!');
            } else {
                alert('Dealer wins :(');
            }
        }, 100);
    }

    const spinDealer = (minPoints) => {
        let pointsDealer = 0;

        do {
            const card = takeCard();
            pointsDealer = addPoints(card, pointsPlayer.length - 1);
            createCard(card, pointsPlayer.length - 1);
        } while (
            (pointsDealer < minPoints) &&
            (minPoints <= 21)
        );

        whoWin();
    }

    btnTake.addEventListener('click', () => {
        const card = takeCard();
        pointsPlayer = addPoints(card, 0);
        createCard(card, 0);

        if(pointsPlayer > 21) {
            alert('Lost :(');
            btnTake.disabled = true;
            btnStop.disabled = true;
            spinDealer(pointsPlayer);
        } else if (pointsPlayer === 21) {
            alert('21');
            btnTake.disabled = true;
            btnStop.disabled = true;
            spinDealer(pointsPlayer);
        }
    });

    // btnStop.addEventListener('click', () => {
    //     btnTake.disabled = true;
    //     btnStop.disabled = true;
    //     spinDealer(pointsPlayer);
    // });

    // btnNew.addEventListener('click', () => {
    //     deck = createDeck();

    //     pointsDealer = 0;
    //     pointsPlayer = 0;

    //     pointsHTML[0].innerHTML = 0;
    //     pointsHTML[1].innerHTML = 0;

    //     cardsDealer.innerHTML = '';
    //     cardsPlayer.innerHTML = '';

    //     btnTake.disabled = false;
    //     btnStop.disabled = false;
    // });

    return {
        newGame: initGame 
    };
})();