/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'sanaisk\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-newlogo_icon': '&#xe939;',
		'icon-newlogo': '&#xe931;',
		'icon-mouse': '&#xe930;',
		'icon-crosstable': '&#xe900;',
		'icon-logo': '&#xe600;',
		'icon-logomark': '&#xe601;',
		'icon-mark': '&#xe61f;',
		'icon-twitter-square': '&#xf081;',
		'icon-facebook-square': '&#xf082;',
		'icon-linkedin-square': '&#xf08c;',
		'icon-angle-down': '&#xf107;',
		'icon-youtube-play': '&#xf16a;',
		'icon-search': '&#xe036;',
		'icon-arrow-down': '&#xe097;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
