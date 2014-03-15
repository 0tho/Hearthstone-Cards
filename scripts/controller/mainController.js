define(['general_view', 'classes_controller', 'cardSelect_controller', 'cardControl_controller'], function(general, classes, cardSelect, cardControl)
{    
    //possibleStates = ["classes", "cardSelect", "cardControl"];
    var programState = "classes";
    
    var selectedCards = [];
    var selectedClass = "Any";   
    
    var size = [1024+26, 768+69]; 
    general.ready(function()
    {        
        window.resizeTo(size[0], size[1]);
        general.resize(youShallNotResize);
        //cardSelect.init(); 
        //Change after tests
        classes.init(); 
        //cardControl.init();
    });
    
    
    function youShallNotResize()
    {
       window.resizeTo(size[0], size[1]);
    }
    
    
    function changeState(newState, arg)
    {
        var oldState = programState;
        programState = newState;    
        
        
        //classes - Choose a class
        if(oldState === "classes" && newState === "cardSelect")
        {   
            selectedClass = arg;
            console.log("selected", selectedCards);
            general.reset();
            cardSelect.init();           
        }
        
        //cardSelect - Back
        if(oldState === "cardSelect" && newState === "classes")
        {
            console.log("selected", selectedCards);
            selectedClass = "Any";
            selectedCards = [];
            console.log("selected", selectedCards);
            
            general.reset();
            classes.init();
        }
        
        //cardSelect - Done
        if(oldState === "cardSelect" && newState === "cardControl")
        {
            general.reset();
            console.log(selectedCards);
            cardControl.init(selectedCards);
            
        }
        
        //cardControl - Back
        if(oldState === "cardControl" && newState === "cardSelect")
        {
            general.reset();
            cardSelect.init();     
            resetUseOfCars();
        }
        
        
    }
    
    function selectCard(card)
    {
        if(selectedCards.length < 30)
        {
            var novaCarta = {};
            novaCarta.name = card.name;
            novaCarta.rarity = card.rarity;
            novaCarta.type = card.type;
            novaCarta.race = card.race;
            novaCarta.class = card.class;
            novaCarta.mana = card.mana;
            novaCarta.attack = card.attack;
            novaCarta.health = card.health;
            novaCarta.descr = card.descr;
            novaCarta.image = card.image;
            novaCarta.used = false;
            
            selectedCards.push(novaCarta);
            
            
            selectedCards.sort(orderByManaName);
            
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function orderByManaName(a, b)
    {
        if(a.mana < b.mana)
        {
            return -1;
        }else if(b.mana < a.mana)
        {
            return 1;
        }else
        {
            if(a.name < b.name)
            {
                return -1;
            }else if(b.name < a.name)
            {
                return 1;
            }else
            {
                return 0;
            }
        }
    }
        
    function removeCard(card)
    {
        var cardIndex = findCardByName(card, selectedCards);
        
        console.log( cardIndex, 'cardIndex');
        console.log(cardIndex === false);
        if(cardIndex !== false)
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
    
    function useCard(card)
    {
        var array = selectedCards;
        var i = 0;
        
        for(i=0;i<array.length;i++)
        {
            var cardB = array[i];
            if(card.name === cardB.name && cardB.used === false)
            {
                break;
            }
        }
        
        if(i === array.length)
        {
            return false;
        }
        
        console.log(selectedCards, i);
        selectedCards[i].used = true;
        console.log(selectedCards, i);
        
        if(i !== selectedCards.length -1 && card.name === selectedCards[i+1].name)
        {           
            return "decrement";
        }else if(i !== false)
        {
            return "turnOff";
        }else if(i === false)
        {
            return "bug";
        }
    }
    
    function resetUseOfCars()
    {
        for(i=0; i< selectedCards.length; i++)
           {
               selectedCards[i].used = false;
           }
    }
    
    return {
        changeState: changeState,
        selectCard: selectCard,
        removeCard: removeCard,
        selectedCards: selectedCards,
        findCardByName: findCardByName,
        useCard: useCard,
        resetUseOfCars: resetUseOfCars,
        selectedClass: function()
        {            
            return selectedClass;
        }
        
    };
});

