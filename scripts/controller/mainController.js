//This file configures the router to function properly
define(['general_view', 'router', 'classes_controller', 'cardSelect_controller', 'cardControl_controller', 'deckController'], function(general, router, classes, cardSelect, cardControl, deckController)
{ 
    return function init() {   
    //define all program states
        router.registerState("classes", true, classes.init);    
        router.registerState("cardSelect");  
        router.registerState("cardControl");  
    //define all possible routes between states
        router.registerRoutes("classes", "cardSelect", routeClassesToCardSelect);
        router.registerRoutes("cardSelect", "cardControl", routeCardSelectToCardControl);
        router.registerRoutes("cardControl", "cardSelect", routeCardControlToCardSelect);
        router.registerRoutes("cardSelect", "classes", routeCardSelectToClasses);
    //set a general fuction to all state changes
        router.onChangeState(function(){general.reset();});
    //init first state defined on router
        router.start();

    //The callback functions of all possible routes
        function routeClassesToCardSelect(_class)
        {        
            deckController.changeClass(_class);       
            cardSelect.init();
        }

        function routeCardSelectToCardControl()
        {

            cardControl.init();
        }

        function routeCardControlToCardSelect()
        {

            cardSelect.init();
        }

        function routeCardSelectToClasses()
        {        
            classes.init();
        }   
    };
});

