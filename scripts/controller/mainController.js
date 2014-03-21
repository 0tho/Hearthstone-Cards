define(['general_view', 'router', 'classes_controller', 'cardSelect_controller', 'cardControl_controller', 'deckController'], function(general, router, classes, cardSelect, cardControl, deckController)
{       
    router.registerState("classes", true, classes.init);    
    router.registerState("cardSelect");  
    router.registerState("cardControl");  

    router.registerRoutes("classes", "cardSelect", routeClassesToCardSelect);
    router.registerRoutes("cardSelect", "cardControl", routeCardSelectToCardControl);
    router.registerRoutes("cardControl", "cardSelect", routeCardControlToCardSelect);
    router.registerRoutes("cardSelect", "classes", routeCardSelectToClasses);

    router.onChangeState(function(){general.reset();});

    router.start();

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
});

