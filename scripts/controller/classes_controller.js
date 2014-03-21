define(['general_view', 'classes_view', 'router', 'data'], function(general, classes, router, data)
{        
    var selectedClass;
    
    //The init function appends the html into our browser and then adds all interactions
    function init()
    {
        general.append(classes.html);
        classes.init(data.hearth_classes);
        classes.classesClick(function()
        {            
            selectedClass = $(this).data('class');            
        });
        classes.selectClick(function()
        {           
            if(selectedClass)
            {
                router.changeState('cardSelect', selectedClass);
            }
        });
    }

    return {
        init: init
    };
});