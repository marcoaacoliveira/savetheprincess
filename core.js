
var characters = [];
var rollDice = function (value) {
    'use strict';
    var counter = 0, totalDamage = 0;
    while (counter < value) {
        totalDamage += Math.ceil(Math.random() * 6);
        counter += 1;
    }
    return totalDamage;
};

var calculaCaracteristica = function () {
    'use strict';
    return Math.ceil(Math.random() * 5);
};

var verifySkill = function (limit) {
    'use strict';
    var value_skill;
    do {
        value_skill = calculaCaracteristica();
    } while (value_skill > limit && limit !==0);
    return Math.max(value_skill, 0);
};

var Character = function(attr){
    this.name = attr.name;
    this.forc;
    this.arm;
    this.res;
}
Character.prototype.attack = function () {
    return rollDice(this.forc);
};
    
Character.prototype.defend = function () {
    return rollDice(this.arm);
};

var createCharacter = function (name, limit) {
    'use strict';
    var character = new Character({name : name}), value_skill;
    character.forc = 0;
    character.arm = 0;
    character.res = 0;
    if (limit > 0) {
        value_skill = verifySkill(limit);
        limit -= value_skill;
        character.forc = value_skill;
    
    }
    if (limit > 0) {
        value_skill = verifySkill(limit);
        limit -= value_skill;
        character.res = value_skill;
        
    }
    if (limit > 0) {
        value_skill = verifySkill(limit);
        limit -= value_skill;
        character.arm = verifySkill(limit);
    }
    
    character.max_hp = character.res * 5;
    character.current_hp = character.max_hp;
    return character;   
};

var turn = function (attacker, defender) {
    'use strict';
    var totalDamage = attacker.attack(), totalArmor =  defender.defend();
    if (totalDamage > totalArmor) {
        defender.current_hp = defender.current_hp - (totalDamage - totalArmor);
    }
    return defender;
        
};

var battle = function (hero_one, hero_two) {
    'use strict';
    if (hero_one.current_hp > 0) {
        hero_two = turn(hero_one, hero_two);
        console.log(hero_two.current_hp);
    }
    if (hero_two.current_hp > 0) {
        hero_one = turn(hero_two, hero_one);
        console.log(hero_one.current_hp);
    }
};

var print_character = function (hero) {
    var display = document.getElementById('display'), no = document.createElement('div'),
        name = document.createTextNode('name: '+ hero.name +' ');
        no.appendChild(name);
        forc = document.createTextNode('force: '+ hero.forc +' ');
        no.appendChild(forc);
        resist = document.createTextNode('resist: '+ hero.res+' ');
        no.appendChild(resist);
        armor = document.createTextNode("armor: "+ hero.arm+' ');
        no.appendChild(armor);
    display.appendChild(no);
}

//batalhas

characters.push(createCharacter('marco', 10));
print_character(characters[0]);
characters.push(createCharacter('robsao', 10));
print_character(characters[1]);


var start_battle = function () {
    'use strict';
    if(characters[0].current_hp > 0 && characters[1].current_hp > 0){
        battle(characters[0],characters[1]);
    }
    else if(characters[0]<=0){
        console.log(characters[0].name + " morreu");
    }
    else{
        console.log(characters[1].name +" morreu");
    }
};

var button = document.querySelector('button');
button.addEventListener('click', start_battle);
