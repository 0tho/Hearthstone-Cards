define([], function()
{
//Private vars
	//All program states are registered in this var
	var programStates = [];
	//this var represents the actual program state
	var programState;
	//This var will remember the last state of the program to call the right function when the change state is called
	var lastProgamState = "";
	//A route is a matrix of last state, next state and callback function
	var routes = [];
	//Callback functions for all state changes
	var generalCallBacks = [];
	//Initial function
	var initialFunction;

//Prototype objects
	function Route(stateA, stateB, _function)
	{
		this.stateA = stateA;
		this.stateB = stateB;
		this._function = _function;
	}
//Functions

    //Register a new program state if this is not already defined
	function registerState(state, isInitialState, _initialFunction)
	{
		if(isStateValid(state))
		{
			programStates.push(state);
			if(isInitialState)
			{
				programState = state;
				lastProgamState = state;

				initialFunction = _initialFunction;
				
			}
			//state registered
			return true;
		}else{
			//failed to register new state
			return false;
		}
	}
	
    //check if state can be defined
	function isStateValid(state)
	{
		var i = 0;
		var valid = true;

		while(valid && i<programStates.length)
		{
			if(state === programStates[i])
			{
				valid = false;
			}
			i++;			
		}

		return valid;
	}

    //register callback functions to all state changes
	function onChangeState(_function)
	{
		generalCallBacks.push(_function);
	}

    //change program state and call funciton relative to route made
	function changeState(state, arg)
	{
		var i;
		var j;


		lastProgamState = programState;
		programState = state;
		

		for(i=0;i<generalCallBacks.length;i++)
		{
			generalCallBacks[i]();
		}

		for(i=0; i<routes.length; i++)
		{
			if(routes[i].stateA === lastProgamState && routes[i].stateB === programState)
			{
				routes[i]._function(arg);
				return true;
			}
		}

		return false;
	}
    
    //register route between two states and their functions 
	function registerRoutes(stateA, stateB, _functionAB, _functionBA)
	{

		var routeAB = new Route(stateA, stateB, _functionAB);
		var AB = registerRoute(routeAB);
		if(_functionBA)
		{
			var routeBA = new Route(stateB, stateA, _functionBA);
			var BA = registerRoute(routeBA);
		}

		return AB || BA;
	}

    //register single route between two states
	function registerRoute(route)
	{		
		if(isRouteValid(route))
		{
			routes.push(route);
			return true;
		}else{
			return false;
		}
	}

    //check if route is valid
	function isRouteValid(route)
	{
		var i = 0;
		var valid = true;

		while(valid && i<routes.length)
		{
			if(route.stateA === routes[i].stateA && route.stateB === routes[i].stateB)
			{
				valid = false;
			}
			i++;			
		}
		return valid;
	}

    //call initial state function
	function start(arg)
	{
		initialFunction(arg);
	}

//Module interface
	return {
		registerState: registerState,
		registerRoutes: registerRoutes,
		onChangeState: onChangeState,
		changeState: changeState,

		start: start
	};
});