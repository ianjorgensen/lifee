//var _ = require('underscore');
//var common = require('common');

var ranger = function(ranges) {
	if (common.sum(_.values(ranges)) !== 1) {
		return 'doesnt add up';
	}

	var last = 0;
	
	for(var range in ranges) {
		ranges[range] = last + ranges[range];
		last = ranges[range];
	}

	var random = function() {
		var rand = Math.random();

		for(var range in ranges) {
			if(rand <= ranges[range]) {
				var bottom = parseInt(range.split('-')[0]);
				var top = parseInt(range.split('-')[1]);

				return bottom + (Math.random()	 * (top - bottom));
			}
		}
	};

	return {
		random: random
	}
};

//console.log(ranger({ '2-4':0.15, '4-10':0.65, '10-17':0.18,	'17-30':0.02}).random());

//exports.ranger = ranger;