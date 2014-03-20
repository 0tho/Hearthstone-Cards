define(['general_view', 'router', 'classes_controller', 'cardSelect_controller', 'cardControl_controller', 'deckController'], function(general, router, classes, cardSelect, cardControl, deckController)
{       
    router.registerState("classes", true, classes.init); 
    console.log(classes); 
    router.registerState("cardSelect");  
    router.registerState("cardControl");  

    router.registerRoutes("classes", "cardSelect", routeClassesToCardSelect);
    router.registerRoutes("cardSelect", "cardControl", routeClassesToCardSelect);
    router.registerRoutes("cardControl", "cardSelect", routeClassesToCardSelect);
    router.registerRoutes("cardSelect", "classes", routeClassesToCardSelect);

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

