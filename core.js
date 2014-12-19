
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
    } while (value_skill > limit);
    return value_skill;
};

var create = function (name, limit) {
    'use strict';
    var character = {name : name}, value_skill;
    character.forc = 0;
    character.arm = 0;
    character.res = 0;
    if(limit > 0){
        value_skill = verifySkill(limit);
        limit -= value_skill;
        character.forc = verifySkill(limit);
    
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
    character.attack = function(){
        return rollDice(character.forc);
    };
    character.defend = function(){
        return rollDice(character.arm);
    }
    return character;
};

var battle = function (hero_one, hero_two) {
    'use strict';
    var totalDamage = 0, totalArmor = 0;
    while (hero_one.current_hp >= 0 && hero_two.current_hp >= 0) {
        totalDamage = hero_one.attack();
        totalArmor =  hero_two.defend();
        if (totalDamage > totalArmor) {
            hero_two.current_hp = hero_two.current_hp - (totalDamage - totalArmor);
        }
        totalDamage = hero_two.attack();
        totalArmor = hero_one.defend();
        if (totalDamage > totalArmor) {
            hero_one.current_hp = hero_one.current_hp - (totalDamage - totalArmor);
        }        
    }
    if (hero_one.current_hp <= 0) {
        return hero_two;
    }
    return hero_one;
};

var start_battle = function () {
    'use strict';
    var characters = [];
    characters.push(create("marco", 10));
    characters.push(create("robsao", 10));

    return battle(characters[0], characters[1]);
}
