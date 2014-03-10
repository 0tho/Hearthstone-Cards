define(['general_view', 'classes_controller', 'cardSelect_controller', 'cardControl_controller'], function(general, classes, cardSelect, cardControl)
{    
    //possibleStates = ["classes", "cardSelect", "cardControl"];
    var programState = "classes";
    
    var selectedCards = [];
    var selectedClass = "";
    
    var size = [1024+26, 768+69]; 
    general.ready(function()
    {        
        window.resizeTo(size[0], size[1]);
        general.resize(youShallNotResize);
        //cardSelect.init(); 
        //Change after tests
        classes.init();        
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
            console.log("before sort", selectedCards);
            selectedCards.sort(orderByManaName);
            console.log("after sort", selectedCards);
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
    
    return {
        changeState: changeState,
        selectCard: selectCard,
        removeCard: removeCard,
        selectedCards: selectedCards,
        findCardByName: findCardByName
    };
});

