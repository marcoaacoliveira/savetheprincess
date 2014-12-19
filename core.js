var damage = function (force, armor) {
    'use strict';
    if (force > armor) {
        return 'First';
    }
    return 'Second';
    
};


var hero_one = {forc : 5, res : 5, arm : 5};
var hero_two = {forc : 2, res : 2, arm : 1};
var rollDice = function (value) {
    'use strict';
    var counter = 0, totalDamage = 0;
    while (counter < value) {
        totalDamage += Math.ceil(Math.random() * 6);
        counter += 1;
    }
    return totalDamage;
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

