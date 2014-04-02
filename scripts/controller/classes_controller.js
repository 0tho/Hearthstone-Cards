//This module controls the interactions of classes selection screen
define(['general_view', 'classes_view', 'router', 'data'], function(general, classes, router, data)
{     
//Variables
    var selectedClass;
//Functions
    //The init function appends the html into our browser and then adds all interactions
    function init()
    {
        general.append(classes.html);
        classes.init(data.hearth_classes);
        classes.classesClick(function()
        {            
            selectedClass = $(this).data('class');
            $('#selectClass').addClass("ready");
            $('#classShield').removeClass().addClass(selectedClass+"_shield");             
        });
        classes.selectClick(function()
        {           
            if(selectedClass)
            {
                router.changeState('cardSelect', selectedClass);
            }
        });
    }
//Module Interface
    return {
        init: init
    };
});