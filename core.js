var characters = {};
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
    character.forc = verifySkill(limit);
    if (limit > 0) {
        value_skill = verifySkill(limit);
        limit -= value_skill;
        character.res = value_skill;
        
    } else {
        character.res = 0;
    }
    if (limit > 0) {
        value_skill = verifySkill(limit);
        limit -= value_skill;
        character.arm = verifySkill(limit);
    } else {
        character.arm = 0;
    }
    
    return character;
};

var battle = function (hero_one, hero_two) {
    'use strict';
    var hp_one = hero_one.res * 5, hp_two = hero_two.res * 5, totalDamage = 0, totalArmor = 0;
    while (hp_one >= 0 && hp_two >= 0) {
        totalDamage = rollDice(hero_one.forc);
        totalArmor = rollDice(hero_two.arm);
        if (totalDamage > totalArmor) {
            hp_two = hp_two - (totalDamage - totalArmor);
        }
        totalDamage = rollDice(hero_two.forc);
        totalArmor = rollDice(hero_one.arm);
        if (totalDamage > totalArmor) {
            hp_one = hp_one - (totalDamage - totalArmor);
        }
        
    }
    if (hp_one <= 0) {
        return "Jogador 2 ganhou";
    }
    return "Jogador 1 ganhou";
};

var start_battle = function () {
    'use strict';
    characters = new Array();
    characters.push(create("marco",10));
    characters.push(create("robsao",10));
    console.log(characters);
    battle(characters[0], characters[1]);
}
