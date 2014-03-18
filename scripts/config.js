require.config({
    baseUrl: 'scripts/',
    paths: {        
        jquery: 'libs/jquery-min',
        text: 'libs/text',
        
        data: 'model/data',
        
        general_view: 'view/general_view',
        classes_view: 'view/classes_view', 
        cardSelect_view: 'view/cardSelect_view', 
        cardControl_view: 'view/cardControl_view',
        
        mainController: 'controller/mainController',
        classes_controller: 'controller/classes_controller', 
        cardSelect_controller: 'controller/cardSelect_controller', 
        cardControl_controller: 'controller/cardControl_controller'
    }
});

require(["mainController"]);



