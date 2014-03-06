define(['general_view', 'classes_controller', 'cardSelect_controller', 'cardControl_controller'], function(general, classes, cardSelect, cardControl)
{    
    //possibleStates = ["classes", "cardSelect", "cardControl"];
    var programState = "classes";
    
    var selectedCards = [];
    var selectedClass = "";
    
    general.ready(function()
    {        
        window.resizeTo(1024+26, 768+69);
        //cardSelect.init(); 
        //Change after tests
        classes.init();        
    });
    
    function changeState(newState, arg)
    {
        var oldState = programState;
        programState = newState;        
        
        //classes - Choose a class
        if(oldState === "classes" && newState === "cardSelect")
        {
            selectedClass = arg;
            console.log(selectedClass);
            general.reset();
            cardSelect.init();
            
        }
        
        //cardSelect - Back
        if(oldState === "cardSelect" && newState === "classes")
        {
            selectedClass = "";
            selectedCards = [];
            general.reset();
            classes.init();
        }
        
        //cardSelect - Done
        if(oldState === "cardSelect" && newState === "cardControl")
        {
            
        }
        
        //cardControl - Back
        if(oldState === "cardControl" && newState === "cardSelect")
        {
            
        }
        
        
    }
    
    function selectCard(card)
    {
        if(selectedCards.length < 30)
        {
            selectedCards.push(card);
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function removeCard(card)
    {
        var cardIndex = findCardByName(card, selectedCards);
        
        if(cardIndex)
        {
            selectedCards.splice(cardIndex, 1);
            
            return true;
        }else
        {
            return false;
        }
    }
    
    function findCardByName(card, array)
    {
        var i = 0;
        while(card.name !== array[i].name && ++i< array.length);
       
        
        if(i === array.length)
        {
            return false;
        }else
        {
            return i;
        }
    }
    
    return {
        changeState: changeState,
        selectCard: selectCard,
        removeCard: removeCard,
        selectedCards: selectedCards
    };
});

