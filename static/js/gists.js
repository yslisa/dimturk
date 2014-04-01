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

// Reading filename 


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


// Shuffle an array (courtesy of Google)
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// Generate random array of n discrete features 

nfeats = 9;

function makeArray(count, content) {
   var result = [];
   if(typeof(content) == "function") {
      for(var i=0; i<count; i++) {
         result.push(content(i));
      }
   } else {
      for(var i=0; i<count; i++) {
         result.push(content);
      }
   }
   return result;
}

var features = shuffle(makeArray(nfeats, function(i) { return i+1; }));

