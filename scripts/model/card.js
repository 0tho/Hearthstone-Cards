//This module define a card prototype
define([], function()
{    
	return function Card(data)
	{
		var name = data.name;
		var rarity = data.rarity;
		var type = data.type;
		var race = data.race;
		var clas = data.clas;
		var mana = data.mana;
		var attack = data.attack;
		var health = data.health;
		var descr = data.descr;
		var image = data.image;
		var used = false;

		return {
			name: name,
			rarity: rarity,
			type: type,
			race: race,
			clas: clas,
			mana: mana,
			attack: attack,
			health: health,
			descr: descr,
			image: image,
			
			use: function()
			{
				used = true;
			},
			reset: function()
			{
				used = false;
			},
			isUsed: function()
			{
				return used;
			}
		}
	};
});