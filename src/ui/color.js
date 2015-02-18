/*
*	Establish the chase.ui object
*/
chase.ui = chase.ui || {};

/*
*	Establish the chase.ui.color object
*/
chase.ui.color = chase.ui.color || {};

/*
*	Default color constants
*/
chase.ui.color.WHITE = '#ffffff';
chase.ui.color.BLACK = '#000000';
chase.ui.color.MAROON = '#980000';
chase.ui.color.RED = '#ff0000';
chase.ui.color.ORANGE = '#ff9800';
chase.ui.color.YELLOW = '#ffff00';
chase.ui.color.GREEN = '#00ff00';
chase.ui.color.TEAL = '#00ffff';
chase.ui.color.BLUE = '#4a86e8';
chase.ui.color.NEON_BLUE = '#0000ff';
chase.ui.color.PURPLE = '#9800ff';
chase.ui.color.PINK = '#ff00ff';

/*
*	Hex to RGB
*/
chase.ui.color.rgb = function(r, g, b){
	if (!chase.check.null(r) && !chase.check.null(g) && !chase.check.null(b)){
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
	else{
		chase.ex.param('ui.color.rgb', 'Numbers');
	}
}

/*
*	RGB to hex
*/
chase.ui.color.hex = function(hex){
	if (chase.check.str(hex)){
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
	}
	else{
		chase.ex.param('ui.color.hex', 'String');
	}
}

/*
*	Change the shade of the color
* Reference: https://rlvandaveer.wordpress.com/2014/01/05/how-to-calculate-a-lighter-or-darker-shade-of-a-color-using-javascript/
*/
chase.ui.color.shade = function(color, percent){
	if (chase.check.str(color) && chase.check.num(percent)){
	// validate hex string
	color = color.replace(/[^0-9a-f]/gi, '');

	if (color.length < 6) {
		color = color[0]+ color[0]+ color[1]+ color[1]+ color[2]+ color[2];
	}

	percent = percent / 10 || 0;

	// convert to decimal and change luminosity
	var newColor = "#", c, i, black = 0, white = 255;
	for (i = 0; i < 3; i++) {
		c = parseInt(color.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(black, c + (percent * white)), white)).toString(16);
		newColor += ("00"+c).substr(c.length);
	}
	return newColor; 
	}
	else{
		chase.ex.param('ui.color.shade', 'String and Number');
	}
}