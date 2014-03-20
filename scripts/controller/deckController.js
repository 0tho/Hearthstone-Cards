//Deck Controller manages all deck data
define(['data', 'card', 'deck', 'localStorage'], function()
{
	return{
		deck: [{name:'lol'}],
		changeClass: function (_class)
		{
			return true;
		}
	}
});