var damage = function (force, armor) {
    'use strict';
    if (force > armor) {
        return 'First';
    }
    return 'Second';
    
};