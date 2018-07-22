
$(function(){

    var cards = [{
            id:1,
            name: 'card 1',
            text: 'hello',
        },
        {
            id:2,
            name: 'card 2',
            text: 'world',
        }];

    var deck = [];



    var HTML_deck = $('<ul/>');
    var HTML_cardList = $('<ul/>');

    
    init();

    function init() {
        initDeckFromUrl();
        renderCardList();
        initListeners();
    }
    
    function initListeners() {
        initCardQttListener();
    };

    function initCardQttListener() {
        $('body').on('click' , '.js-edit-deck-card-qtt', function(evt){
                            //Add card to deck
                            target = $(evt.target);

                            cardId = target.attr('data-card-id');
                            qtt = target.attr('data-qtt');

                            modifyDeckQtt(cardId, qtt);
                            //Render deck
                            renderDeck();
                        }
                    );
    }

    function renderCardList() {
        $.each(cards, function(i, card)
        {
            var li = $('<li/>')
                .appendTo(HTML_cardList);
            var content = $('<div/>')
                .addClass('js-edit-deck-card-qtt')
                .attr('data-card-id', card.id)
                .attr('data-qtt', 1)
                .html(card.name)
                .appendTo(li);
    
        });
    
        $('#collection').append(HTML_cardList);
    }

    function renderDeck() {
        HTML_deck = $('<ul/>');

        $.each(deck, function(i, deckEntry){
            var li = $('<li/>')
            .appendTo(HTML_deck);
            var content = $('<div/>')
            .addClass('js-edit-deck-card-qtt')
            .attr('data-card-id', deckEntry.cardId)
            .attr('data-qtt', -1)
            .html(getCardById(deckEntry.cardId).name + '(' + deckEntry.counter +')')
            .appendTo(li); 
        });

        $('#deck').html(HTML_deck);
    }

    function getCardById(id) {
        return cards.find(x => x.id == id);
    }


    function modifyDeckQtt(cardId, value) {
        var deckEntry = deck.find(x => x.cardId == cardId);

        if(deckEntry !== undefined && deckEntry !== null){
            deckEntry.counter += parseInt(value);

            if(deckEntry.counter <= 0) {
                deck = $.grep(deck, function(value) {
                    return value.cardId != deckEntry.cardId 
                });    
            }

        }else if(value > 0) {
            deck.push({
                cardId: cardId,
                counter: parseInt(value) 
            });
        }
    }


    function initDeckFromUrl(){
        var deckString = getUrlParameter('deck');

        if (deckString !== undefined && deckString !== null) {
            deck = deckString
        }
    }
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

});