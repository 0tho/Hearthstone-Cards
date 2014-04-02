//Configure all files paths, so inside each module the files adress are shorter
require.config({
    baseUrl: 'scripts/',
    paths: {        
        jquery: 'libs/jquery-min',
        text: 'libs/text',
        
        data: 'model/data',
        card: 'model/card',
        deck: 'model/deck',
        
        general_view: 'view/general_view',
        classes_view: 'view/classes_view', 
        cardSelect_view: 'view/cardSelect_view', 
        cardControl_view: 'view/cardControl_view',
        
        router: 'controller/router',
        deckController: 'controller/deckController',
        mainController: 'controller/mainController',
        classes_controller: 'controller/classes_controller', 
        cardSelect_controller: 'controller/cardSelect_controller', 
        cardControl_controller: 'controller/cardControl_controller'
    }
});
//Init the app when everything is ready
require( ["jquery", "mainController"], function($, mainController) 
{
    $('document').ready(function()
    {
    //Init app
        mainController.init();
    //Prevent context menu
        if (document.addEventListener) {
            document.addEventListener('contextmenu', function(e) {
                
                e.preventDefault();
            }, false);
        } else {
            document.attachEvent('oncontextmenu', function() {
                
                window.event.returnValue = false;
            });
        }
    });   
});




