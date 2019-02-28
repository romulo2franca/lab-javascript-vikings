// Soldier
function Soldier(health, strength) {
    this.health = health;
    this.strength = strength;
}

Soldier.prototype.attack = function () {
    return this.strength;
}

Soldier.prototype.receiveDamage = function (damage) {
    this.health -= damage;
}

// Viking
function Viking(name, health, strength) {
    this.name = name;
    Soldier.call(this, health, strength);
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function (damage) {
    this.health -= damage;
    return this.health > 0 ? `${this.name} has received ${damage} points of damage` : `${this.name} has died in act of combat` 
}

Viking.prototype.battleCry = function () {
    return 'Odin Owns You All!'
}
 
// Saxon
function Saxon(health, strength) {
    Soldier.call(this, health, strength);
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.receiveDamage = function (damage) {
    this.health -= damage;
    return this.health > 0 ? `A Saxon has received ${damage} points of damage` : `A Saxon has died in combat`
}

// War
function War() {
    this.vikingArmy = [];
    this.saxonArmy = [];
}

War.prototype.addViking = function (viking) {
    this.vikingArmy.push(viking);
}

War.prototype.addSaxon = function (saxon) {
    this.saxonArmy.push(saxon);
}

War.prototype.vikingAttack = function () {
    const saxonIndex = Math.floor(Math.random() * this.saxonArmy.length)
    const saxon = this.saxonArmy[saxonIndex];
    const viking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
    viking.strength >= saxon.health ? this.saxonArmy.splice(saxonIndex) : 0;
    return saxon.receiveDamage(viking.strength);
}

War.prototype.saxonAttack = function () {
    const vikingIndex = Math.floor(Math.random() * this.vikingArmy.length)
    const viking = this.vikingArmy[vikingIndex];
    const saxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    saxon.strength >= viking.health ? this.vikingArmy.splice(vikingIndex) : 0;
    return viking.receiveDamage(saxon.strength);
}

War.prototype.showStatus = function () {
    if (this.saxonArmy.length === 0) return 'Vikings have won the war of the century!';
    if (this.vikingArmy.length === 0) return 'Saxons have fought for their lives and survive another day...';
    if (this.vikingArmy.length === 1 && this.saxonArmy.length === 1) return 'Vikings and Saxons are still in the thick of battle.';
}