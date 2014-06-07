/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = PsiTurk(uniqueId, adServerLoc);

// All pages to be loaded
var pages = [
	"instruct.html",
	"stage.html",
	"gameend.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instruct.html"
];

var points = 0;
var game = 1;
var numGames = 10;
var feature = 0;



/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/

/********************
* STROOP TEST       *
********************/
var TestPhase = function() {

	var wordon, // time word is presented
	    listening = false;

	

	// Stimuli 

	var numTrials = 10; // number of trials

	var stims = new Array(numTrials);

	var color = ["1", "2", "3"];
	var shape = ["1", "2", "3"];
	var pattern = ["1", "2", "3"];


	for (var i = 0; i < numTrials; i++) {
		stims[i] = new Array();
		// shuffle the three arrays
		color = _.shuffle(color);
		shape = _.shuffle(shape);
		pattern = _.shuffle(pattern);
		stims[i][0] = color[0]+shape[0]+pattern[0];
		stims[i][1] = color[1]+shape[1]+pattern[1];
		stims[i][2] = color[2]+shape[2]+pattern[2];
	}
	_.shuffle(stims);

	// choose feature
	/* 1 = green
	   2 = red
	   3 = yellow
	   4 = square
	   5 = circle
	   6 = triangle
	   7 = # # # 
	   8 = • • •
	   9 = ~ ~ ~
	*/
	if (game == 1)
		feature = Math.floor(Math.random()*9)
	else {
		var randfeature = Math.floor(Math.random()*9)
		// choose a feature (dimension different from the previous feature)
		while (feature/3 == randfeature/3)
			randfeature = Math.floor(Math.random()*9)
		feature = randfeature
	}

	var next = function() {
		// end
		if (stims.length===0) {
			game+=1;
			if (game > numGames)
				finish();
			else {
				$("body").unbind("keydown", response_handler); // Unbind keys
	    		currentview = new GameEnd();
			}
				//TestPhase();
		}
		// fixation cross
		else {
			stim = stims.shift();
			show_stim("blank", "Fix", "blank");
			setTimeout(present_stimuli, 1000)
			
		}
	};

	// present 3 stims
	var present_stimuli = function() {
		show_stim(stim[0], stim[1], stim[2]);
		wordon = new Date().getTime();
		listening = true;
		d3.select("#query").html('<br><p id="prompt">Type "b" for the first figure, "n" for the second, "m" for the third.</p>');
	}
	
	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode,
			response;

		switch (keyCode) {
			case 66:
				// "b"
				response="1";
				break;
			case 78:
				// "n"
				response="2";
				break;
			case 77:
				// "m"
				response="3";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			//var hit = response == stim[3];           // whether the participant chose the correct dimension
			var compare = stim[response-1].charAt(feature/3);
			var hit = compare == (feature%3)+1;
			var rt = new Date().getTime() - wordon;  // reaction time
			var gained = 0;

			if (rt > 2000) {
				if (response == "1")
							show_stim("Slow", "blank", "blank");
						else if (response == "2")
							show_stim("blank", "Slow", "blank");
						else
							show_stim("blank", "blank", "Slow");
			}

			else {
				var rand = Math.random();
				if (hit) {
					
					// +1 with .75 probability
					if (rand < 0.75) {
						points+=1;
						gained = 1;
						if (response == "1")
							show_stim("Win", "blank", "blank");
						else if (response == "2")
							show_stim("blank", "Win", "blank");
						else
							show_stim("blank", "blank", "Win");
					}
					else {
						if (response == "1")
							show_stim("Lose", "blank", "blank");
						else if (response == "2")
							show_stim("blank", "Lose", "blank");
						else
							show_stim("blank", "blank", "Lose");
					}
				}
				else {
					// +1 with .25 probability
					if (rand < 0.75)
						if (response == "1")
							show_stim("Lose", "blank", "blank");
						else if (response == "2")
							show_stim("blank", "Lose", "blank");
						else
							show_stim("blank", "blank", "Lose");
					else { 
						points+=1;
						gained = 1;
						if (response == "1")
							show_stim("Win", "blank", "blank");
						else if (response == "2")
							show_stim("blank", "Win", "blank");
						else
							show_stim("blank", "blank", "Win");
					}
				}
			}

			psiTurk.recordTrialData({'phase':game,
                                     'stimuli1':stim[0],
                                     'stimuli2':stim[1],
                                     'stimuli3':stim[2],
                                     'feature': feature+1,  // feature
                                     'response':response, // user input
                                     'hit':hit,           // whether correct feature was chosen
                                     'outcome':gained,    // point earned
                                     'rt':rt}
                                   );

			setTimeout(next, 1000);
		}
	};

	var finish = function() {
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    currentview = new Questionnaire();
	};
	
	var show_stim = function(stim1, stim2, stim3) {
		remove_stim();
		// diplay game#
		d3.select("#points")
			.append("div")
			.attr("id","gamenum")
			.style("text-align","left")
			.text("Game: "+game)

		// display total points
		d3.select("#points")
			.append("div")
			.attr("id","total")
			.style("text-align","right")
			.text("Points: "+points)

		// three stimuli
		d3.select("#stim1")
			.attr("src","/static/images/stimuli/"+stim1+".png")
		d3.select("#stim2")
			.attr("src","/static/images/stimuli/"+stim2+".png")
		d3.select("#stim3")
			.attr("src","/static/images/stimuli/"+stim3+".png")
	};

	var remove_stim = function() {
		d3.select("#total").remove();
		d3.select("#gamenum").remove();
		//d3.select("#win").remove();
	};

	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test
	next();
};
	
/****************
* Game End *
****************/

var GameEnd = function() {

	var response_handler2 = function(e) {

		$("body").unbind("keydown", response_handler2); // Unbind keys
	    currentview = new TestPhase();
	};


	psiTurk.showPage('gameend.html');
	$("body").focus().keydown(response_handler2); 
};



/****************
* Questionnaire *
****************/

var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});

	};
	
	finish = function() {
		completeHIT();
	};
	
	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                            psiTurk.computeBonus('compute_bonus', function(){finish()}); 
			}, 
			error: prompt_resubmit}
		);
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
	
	$("#continue").click(function () {
	    record_responses();
	    psiTurk.teardownTask();
    	    psiTurk.saveData({
                success: function(){
                    psiTurk.computeBonus('compute_bonus', function(){finish()}); 
                }, 
                error: prompt_resubmit});
	});
    
	
};


var completeHIT = function() {
	// save data one last time here?
	window.location= adServerLoc + "?uniqueId=" + psiTurk.taskdata.id;
}


// Task object to keep track of the current phase
var currentview;


/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new TestPhase(); } // what you want to do when you are done with instructions
    );
});

// vi: noexpandtab tabstop=4 shiftwidth=4
