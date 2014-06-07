// Angela Radulescu's helper js library 
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

// Generate 1:N vector 
function genVec(N) {
	var result = [];
	result = makeVector(N, function(i) { return i+1; });
	return result;
}

// Generate random numbers from a uniform distribution (courtesy of JSB)
function jsb_runif(min,max,n){ 
	min = typeof min!== 'undefined' ? min : 0; // default min=0
	max = typeof max!== 'undefined' ? max : 1; // default max=1
	n = typeof n!== 'undefined' ? n : 1; // default n=1

	var vals = []; // init
	var ii = 0;
	var range = max-min;
	while(ii<n){
		vals[ii] = Math.random()*range + min;
		ii++;
	}
	return vals;
}

// Generate rand numbers from a normal distribution	(courtesy of JSB)
function jsb_rnorm(mean,sd,n){ 
	mean = typeof mean!== 'undefined' ? mean : 0; // default mean=0
	sd = typeof sd!== 'undefined' ? sd : 1; // default sd=1
	n = typeof n!== 'undefined' ? n : 1; // default n=1

	var vals = []; // init
	var ii = 0;
	while(ii<n){
		vals[ii] = ( (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1) )*sd + mean;
		ii++;
	}
	return vals;
}