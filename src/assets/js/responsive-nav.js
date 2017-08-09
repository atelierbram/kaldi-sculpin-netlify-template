(function() {
  "use strict";
// RESPONSIVE NAV JS
// http://jsfiddle.net/csswizardry/ev598/
// http://jsfiddle.net/shanomurphy/zp376/
// https://codepen.io/atelierbram/pen/ALzCs

/* The target nav */
var responsiveNav = document.getElementById('js-responsive-nav');

/* Insert <a> element for toggle button inside the <nav> element */
var toggleBtn = document.createElement('a');
toggleBtn.setAttribute('href', '#');
toggleBtn.setAttribute('class', 'responsive-nav_toggle link');
// responsiveNav.insertBefore(toggleBtn, responsiveNav.firstChild);
toggleBtn.setAttribute('style', 'position:relative');
responsiveNav.insertBefore(toggleBtn, responsiveNav.lastChild);
var menuIconClose = document.createElement('span');
var menuIconOpen = document.createElement('span');
menuIconClose.setAttribute('class', 'menu-icon-close');
menuIconOpen.setAttribute('class', 'menu-icon-open');
menuIconClose.setAttribute('style', 'background-image:url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12px\' height=\'12px\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'white\' d=\'M1.562,0.046l4.336,4.426l4.336-4.426l1.461,1.506L7.381,5.955l4.313,4.403l-1.483,1.504L5.897,7.46l-4.313,4.402 l-1.482-1.504l4.313-4.403L0.102,1.552L1.562,0.046z\'/%3E%3C/svg%3E\");position:absolute;top:0;left:0;right:0;bottom:0;background-repeat:no-repeat;background-position:center');
menuIconOpen.setAttribute('style', 'background-image:url(\"data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'12\' viewBox=\'0 0 16 12\'%3E%3Crect fill=\'white\' width=\'16\' height=\'2\'/%3E%3Crect fill=\'white\' y=\'5\' width=\'16\' height=\'2\'/%3E%3Crect fill=\'white\' y=\'10\' width=\'16\' height=\'2\'/%3E%3C/svg%3E\");position:absolute;top:0;left:0;right:0;bottom:0;background-repeat:no-repeat;background-position:center');
toggleBtn.insertBefore(menuIconClose, toggleBtn.lastChild);
toggleBtn.insertBefore(menuIconOpen, toggleBtn.lastChild);

/* Has Class Function */
function hasClass(e,t){return(new RegExp(' '+t+' ')).test(' '+e.className+' ')}

/* Toggle Class Function */
function toggleClass(e,t){var n=' '+e.className.replace(/[\t\r\n]/g,' ')+' ';if(hasClass(e,t)){while(n.indexOf(' '+t+' ')>=0){n=n.replace(' '+t+' ',' ')}e.className=n.replace(/^\s+|\s+$/g,'')}else{e.className+=' '+t}}

/* Toggle 'responsive-nav--open' when button is clicked */
toggleBtn.onclick = function() {
    toggleClass(this.parentNode, 'responsive-nav_open');
}
}());

/* Add a class of 'js' to the HTML element */
// var root = document.documentElement;
// root.className = root.className + ' js';
