
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

var createCharacter = function (name, limit) {
    'use strict';
    var character = {name : name}, value_skill;
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
    character.attack = function () {
        return rollDice(character.forc);
    };
    character.defend = function () {
        return rollDice(character.arm);
    };
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
    var totalDamage = 0, totalArmor = 0;
    while (hero_one.current_hp > 0 && hero_two.current_hp > 0) {
        if (hero_one.current_hp > 0) {
            hero_two = turn(hero_one, hero_two);
        }
        if (hero_two.current_hp > 0) {
            hero_one = turn(hero_two, hero_one);
        }
    }
    if (hero_one.current_hp <= 0) {
        return hero_two;
    }
    return hero_one;
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

var start_battle = function () {
    'use strict';
    var characters = [];
    characters.push(createCharacter('marco', 10));
    print_character(characters[0]);
    characters.push(createCharacter('robsao', 10));
    print_character(characters[1]);
    return battle(characters[0], characters[1]);
};
