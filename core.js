var characters = [];
window.addEventListener('load', function () {
    'use strict';
    
    var rollDice = function (value) {
        var counter = 0, total_damage = 0;
        while (counter < value) {
            total_damage += Math.ceil(Math.random() * 6);
            counter += 1;
        }
        return total_damage;
    },
        
    calculaCaracteristica = function () {
        return Math.ceil(Math.random() * 5);
    },
    verifySkill = function (limit) {
        var value_skill;
        do {
            value_skill = calculaCaracteristica();
        } while (value_skill > limit && limit !==0);
        return Math.max(value_skill, 0);
    };

    var Character = function(attr){
        if(typeof attr == 'object') {
            this.name = attr.name;
            this.forc = attr.forc;
            this.arm = attr.arm;
            this.res = attr.res;
        } else {
            this.name = attr;
        }
            
    }
    Character.prototype.attack = function () {
        return rollDice(this.forc);
    };

    Character.prototype.defend = function () {
        return rollDice(this.arm);
    };

    var createCharacter = function (attr, limit) {
        var character =  new Character(attr), value_skill;
        if(typeof attr != 'object') {
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
        }
        character.max_hp = character.res * 5;
        character.current_hp = character.max_hp;
        return character;   
    };

    var turn = function (attacker, defender) {
        var total_damage = attacker.attack(), total_armor =  defender.defend();
        if (total_damage > total_armor) {
            defender.current_hp = defender.current_hp - (total_damage - total_armor);
        }
        return defender;

    };

    var battle = function (hero_one, hero_two) {
        if (hero_one.current_hp > 0) {
            hero_two = turn(hero_one, hero_two);
            print_battle_log(hero_one,hero_two);
        }
        if (hero_two.current_hp > 0) {
            hero_one = turn(hero_two, hero_one);
            print_battle_log(hero_one,hero_two);
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
    
    characters.push(createCharacter('robsao', 10));
    
    
    var render_char = function(hero){
        var character_view = document.getElementById('character');
        var request = new XMLHttpRequest();
        request.open('GET','view_character.html', false);
        request.send();
        console.log(request.responseText);
        character_view.innerHTML = request.responseText;
        document.getElementById('character_name').innerHTML = hero.name;
        document.getElementById('character_forc').innerHTML = hero.forc;
        document.getElementById('character_res').innerHTML = hero.res;
        document.getElementById('character_arm').innerHTML = hero.arm;
    };
    
    var start_battle = function () {
        if(characters[0].current_hp > 0 && characters[1].current_hp > 0){
            battle(characters[0],characters[1]);
        }
        else if(characters[0].current_hp<=0){
            console.log(characters[0].name + " morreu");
        }
        else{
            console.log(characters[1].name +" morreu");
        }
    };

    var button = document.querySelector('button');
    button.addEventListener('click', start_battle);
    var form = document.getElementById('create_form');
    form.addEventListener('submit',function(event){
        event.preventDefault();
        var character = createCharacter({name : document.querySelector('#char_name').value, res : parseInt(document.querySelector('#char_res').value), forc: parseInt(document.querySelector('#char_forc').value), arm: parseInt(document.querySelector('#char_arm').value)});
        characters.push(character);
        render_char(character);
    });
});