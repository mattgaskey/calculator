$(function() {
	//global variables
	var a = []; //screen output array
	var b = []; //math array
	
	//function to display what is being typed
	function doOutput() {
		if (a.length === 1 && a[0] === 0) {
			a.length = 0;
		}
		return $('div.calculate').text(a.join(''));
	}
	
	//function to show equation being strung together
	function showMath() {
		for (var i = 0; i < b.length; i++) {
			if (b[i] === '') {
				b.splice(i, 2);
				i-=1;
			}
		}
		return $('div.math').text(b.join(' '));
	}
	
	//reset block after equals
	function reset() {	
		if (b.indexOf('=') > -1) {
			b.length = 0;
			a.length = 0;
			showMath();
		}
	}
	
	//function to handle floating decimal in result (via Justin Woodward)
	function round(val) {
    val = val.toString().split('');
    if (val.indexOf('.') !== -1) {
      var valTest = val.slice(val.indexOf('.') + 1, val.length);
      val = val.slice(0, val.indexOf('.') + 1);
      var i = 0;
      while (valTest[i] < 1) {
        i++;
      }
      valTest = valTest.join('').slice(0, i + 2);
      if (valTest[valTest.length-1] === '0') {
        valTest = valTest.slice(0, -1);
      }
      return val.join('') + valTest;
    } else {
      return val.join('');
    }
  }
	
//general function for screen output
function outputScreen() {
	//decimal handler
	$('div.content.decimal').click(function () {
		reset();
		//require zero for leading decimal
		if (a.indexOf('.') < 0 && a.length === 0) {
			a.push(0, $(this).children().text());
			doOutput();
		//allow decimals after integers
		} else if (a.indexOf('.') < 0 && a.length > 0) {
			a.push($(this).children().text());
			doOutput();
		//do nothing if decimal already entered	
		} else if (a.indexOf('.') >= 0) {
			doOutput();
		}
	});
	//number handler
	$('div.content.number').click(function () {
		reset();
		//disallow leading zeroes
		if ($(this)[0].innerText === '0' && a.length < 1) {
			a.length = 0;
			doOutput();
		//build number strings
		} else {
			a.push($(this).children().text());
			doOutput();
		}
	});
	//backspace handler
	$('#backspace').click(function () {
		a.pop();
		doOutput();
	});
	//clear handler
	$('#clear').click(function () {
		a.length = 0;
		b.length = 0;
		doOutput();
		showMath();
	});
	//negate handler
	$('#negate').click(function() {
		reset();
		if (a.indexOf('-') === -1) {
		a.unshift('-');
		doOutput();
	} else {
		doOutput();
	}
	});
}
//end of screen ouput commands

//local function for compiling math array
function buildMath() {
	$('div.function').click(function () {
		b.push(a.join(''), $(this).children().text());
		a.length = 0;
		showMath();
	});	
}	
//end of math array compiler

//local function for equals
function doMath() {
	var x = b.slice();  //equals array
	
	function multiply(a,b) {
		return a*b;
	}
	function divide(a,b) {
		return a/b;
	}
	function add(a,b) {
		return a+b;
	}
	function subtract(a,b) {
		return a-b;
	}
	
	for (var i = 1; i < x.length; i+=2) {
		if (x[i] === '\u00D7') {
			var y = Number(x[i-1]);
			var z = Number(x[i+1]);
			var r = multiply(y,z);
			x.splice(i-1, 3, r);
			i-=2;
		}
	}
	for (var i = 1; i < x.length; i+=2) {
		if (x[i] === '\u00F7') {
			var y = Number(x[i-1]);
			var z = Number(x[i+1]);
			var r = divide(y,z);
			x.splice(i-1, 3, r);
			i-=2;
		}
	}
	for (var i = 1; i < x.length; i+=2) {
		if (x[i] === '+') {
			var y = Number(x[i-1]);
			var z = Number(x[i+1]);
			var r = add(y,z);
			x.splice(i-1, 3, r);
			i-=2;
		}
	}
	for (var i = 1; i < x.length; i+=2) {
		if (x[i] === '\u2212') {
			var y = Number(x[i-1]);
			var z = Number(x[i+1]);
			var r = subtract(y,z);
			x.splice(i-1, 3, r);
			i-=2;
		}
	}
	return round(x[0]);
}

//button click effect
function buttonEffect() {
	var num = $('div.content.number');
	var dec = $('div.content.decimal');
	var fun = $('div.content.function');
	var man = $('div.content.manipulate');

	num.on('mousedown touchstart', function(e) {
		$(this).removeClass('number').addClass('press');
	});
	num.on('mouseup touchend', function(e) {
		$(this).removeClass('press').addClass('number');
	});

	dec.on('mousedown touchstart', function(e) {
		$(this).removeClass('decimal').addClass('press');
	});
	dec.on('mouseup touchend', function(e) {
		$(this).removeClass('press').addClass('decimal');
	});

	fun.on('mousedown touchstart', function(e) {
		$(this).removeClass('function').addClass('press');
	});
	fun.on('mouseup touchend', function(e) {
		$(this).removeClass('press').addClass('function');
	});

	man.on('mousedown touchstart', function(e) {
		$(this).removeClass('manipulate').addClass('press');
	});
	man.on('mouseup touchend', function(e) {
		$(this).removeClass('press').addClass('manipulate');
	});
}


buttonEffect();
outputScreen();
buildMath();
//equals handler	
$('#equals').click(function() {
	a.length = 0;
	doOutput();
	$('div.calculate').text(doMath());
});	
});//document ready