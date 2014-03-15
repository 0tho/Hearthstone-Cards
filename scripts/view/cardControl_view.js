define(['jquery', 'text!../html/cardControl.html', 'text!../html/cardThumbnailLayout.html'], function($, html, cardThumbnailLayout)
{  
        
    
    function init(cards)
    {
        $('body').append(html);
        
        
        var i =0;
        
        for (i=0;i<cards.length;i++)
        {
            var card = cards[i];
            var cardDom = $('.cardThumbnailContainer[data-name="'+card.name+'"]');
            if(cardDom.length === 0)
            {
                var cardContainer = $(cardThumbnailLayout);

                cardContainer.attr('data-name', card.name);

                $('.cardThumbnail_mana', cardContainer).text(card.mana);
                $('.cardThumbnail_img', cardContainer).text(card.img);
                $('.cardThumbnail_name', cardContainer).text(card.name);
                $('.cardThumbnail_quantity', cardContainer).text(1);

                $('#cardControl_thumbnails').append(cardContainer);

                if(!card.used)
                {
                    cardContainer.addClass('cardOn');
                }else
                {
                    cardContainer.addClass('cardOff');
                }
            }else
            {
                var quantity = require('cardControl_controller').countCards({name: card.name});
                
                $('.cardThumbnail_quantity', cardDom).text(quantity);
            }
        }    
        
    }
    
    function resetCards()
    {
        var cardControl = require('cardControl_controller');
        
        $('.cardThumbnailContainer').removeClass('cardOff');
        $('.cardThumbnailContainer').addClass('cardOn');
        
        var cards = $('.cardThumbnailContainer');
        var i;
        for(i=0; i< cards.length;i++)
        {
            var cardDom = $(cards[i]);
            var name = cardDom.data('name');
            var quantity = cardControl.countCards({name: name});
            
            $('.cardThumbnail_quantity', cardDom).text(quantity);
        }
    }
    
    function turnCardOn(name)
    {
        var card = $('.cardThumbnailContainer[data-name="'+name+'"]');
        card.removeClass('cardOff');
        card.addClass('cardOn');
    }
    
    function turnCardOff(name)
    {
        var card = $('.cardThumbnailContainer[data-name="'+name+'"]');
        card.removeClass('cardOn');
        card.addClass('cardOff');
    }
    
    function setQuantity(name, value)
    {
        var card = $('.cardThumbnailContainer[data-name="'+name+'"]');
        
        $('.cardThumbnail_quantity', card).text(value);
    }
    
    function updateCardCounter(value)
    {        
        $('#cardControl_cardNumber').text("reset " + value + "/30");
    }
    
    return {
        html: html,
        init: init,
        
        cardsThumbnailClick: function(_function){
            $('.cardThumbnailContainer').click(_function);
        },
        backButton: function(_function){
            $('#cardControl_back').click(_function);
        },
        cardNumberButton: function(_function){
            $('#cardControl_cardNumber').click(_function);
        },
        setQuantity: setQuantity,
        resetCards: resetCards,
        turnCardOn: turnCardOn,
        turnCardOff: turnCardOff,
        updateCardCounter: updateCardCounter
               
    };
});