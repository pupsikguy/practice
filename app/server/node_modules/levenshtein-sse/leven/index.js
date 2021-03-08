/* eslint-disable no-nested-ternary */
'use strict';

module.exports = function (a, b) {
	var arr = [];
	var charCodeCache = [];

	if (a === b) {
		return 0;
	}

	var aLen = a.length;
	var bLen = b.length;

	if (aLen === 0) {
		return bLen;
	}

	if (bLen === 0) {
		return aLen;
	}

	var bCharCode;
	var ret;
	var tmp;
	var tmp2;
	var i = 0;
	var j = 0;

	if (typeof a.charCodeAt !== 'function') {
		charCodeCache = a;
		while (i < aLen) {
			arr[i] = ++i;
		}
	} else {
		while (i < aLen) {
			charCodeCache[i] = a.charCodeAt(i);
			arr[i] = ++i;
		}
	}

	while (j < bLen) {
		bCharCode = typeof b.charCodeAt === 'undefined' ? b[j] : b.charCodeAt(j);
		tmp = j++;
		ret = j;

		for (i = 0; i < aLen; i++) {
			tmp2 = bCharCode === charCodeCache[i] ? tmp : tmp + 1;
			tmp = arr[i];
			ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
		}
	}

	return ret;
};
