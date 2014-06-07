// Pieces of code that may come in handy for task-building 
// Angela Radulescu
// April 1st, 2014

// Creating and updating a stage using Easel
var canvas = document.getElementById('easel'); // what is this for? 
var stage = new createjs.Stage("canvasElementId");
var image = new createjs.Bitmap("imagePath.png");
stage.addChild(image);
createjs.Ticker.addEventListener("tick", handleTick);
function handleTick(event) {
     image.x += 10;
     stage.update();
 }


// Converting string to an integer 
parseInt("123", 10);

// Handy functions 
isNaN();
isFinite();

// Strings as objects
"hello".charAt(0);
"hello".length;

// Creating an object 
var obj = {};

// Defining a class, some attributes and a method
function Person(gender,height) { 
  this.gender = gender;
  this.height = height;
}

Person.prototype.gender = '';
Person.prototype.sayHello = function () {
  console.log('hello');
};

var person1 = new Person('Male',5.5);
var person2 = new Person('Female',5.7);

console.log(person1.gender);
console.log(person2.gender);
console.log(person1.height);
console.log(person2.height);

person1.sayHello(); 








