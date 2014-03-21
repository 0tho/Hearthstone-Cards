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
	
	function isStateValid(state)
	{
		var i = 0;
		var valid = true;

		while(valid && i<programStates.length)
		{
			if(state == programStates[i])
			{
				valid = false;
			}
			i++;			
		}

		return valid;
	}

	function onChangeState(_function)
	{
		generalCallBacks.push(_function);
	}

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
			if(routes[i].stateA == lastProgamState && routes[i].stateB == programState)
			{
				routes[i]._function(arg);
				return true;
			}
		}

		return false;
	}

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

	function isRouteValid(route)
	{
		var i = 0;
		var valid = true;

		while(valid && i<routes.length)
		{
			if(route.stateA == routes[i].stateA && route.stateB == routes[i].stateB)
			{
				valid = false;
			}
			i++;			
		}
		return valid;
	}

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