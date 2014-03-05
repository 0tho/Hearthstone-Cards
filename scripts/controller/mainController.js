define(['general_view', 'classes_controller', 'cardSelect_controller', 'cardControl_controller'], function(general, classes, cardSelect, cardControl)
{    
    //possibleStates = ["classes", "cardSelect", "cardControl"];
    var programState = "classes";
    
    var selectedCard = [];
    var selectedClass = "";
    
    general.ready(function()
    {        
        window.resizeTo(1024+26, 768+69);
        //cardSelect.init(); 
        //Mudar após os testes
        classes.init();        
    });
    
    function changeState(newState, arg)
    {
        var oldState = programState;
        
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
    
    return {
        changeState: changeState
    };
});

