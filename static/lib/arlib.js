// Angela Radulescu's helper functions js library 
// April 1st, 2014

// Shuffle an array (courtesy of Google)
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// Reading a filename from the full path
function getFilename(fullPath, withExtension) {
	var fn = fullPath.replace(/^.*(\\|\/|\:)/, '');
	if (withExtension == 0) {
		return fn.replace(/\..+$/, '');
	} else {
		return fn;
	}
}

// Make a vector of "count" bits filled with "content"
function makeVector(count, content) {
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

// Generate 1:N array 
function genArray(N) {
	var result = [];
	result = makeVector(N, function(i) { return i+1; });
	return result;
}