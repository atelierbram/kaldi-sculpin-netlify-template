var root = document.documentElement;

// function featureDetect() {
(function() {
  "use strict";
root.className = root.className.replace(/\bno-js\b/g, '') + ' js ';
  if ('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {
    root.className = root.className.replace(/\bcore\b/g, '') + ' enhanced ';
  }
  var s = document.body || document.documentElement,
  s = s.style;
  if (s.webkitFlexWrap == '' || s.msFlexWrap == '' || s.flexWrap == '') {
    root.className = root.className.replace(/\bno-flexbox\b/g, '') + ' flexbox ';
  }
}());
// featureDetect();

// function supportsSVG() {
//   "use strict";
//   return !! document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect;
// }
//
// if (supportsSVG()) {
//   root.className += ' svg';
// }
// else {
//   root.className += ' no-svg';
// }
// supportsSVG();

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
addLoadEvent(function() {
  root.className = root.className.replace(/\bis-loading\b/g, '') + ' is-loaded ';
});

// domready
!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(t):this[e]=t()}("domready",function(){var e=[],t,n=document,r=n.documentElement.doScroll,i="DOMContentLoaded",s=(r?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return s||n.addEventListener(i,t=function(){n.removeEventListener(i,t),s=1;while(t=e.shift())t()}),function(t){s?setTimeout(t,0):e.push(t)}})

domready(function () {
  root.className = root.className.replace(/\bdombuilding\b/g, '') + ' domready ';
  // dom is loaded
});

// function detectUseragent() {
(function() {
  // https://codepen.io/atelierbram/pen/hbyAd
  root.setAttribute('data-useragent',  navigator.userAgent);
  root.setAttribute('data-platform', navigator.platform );
  root.className += ((!!('ontouchstart' in window) || !!('onmsgesturechange' in window))?' touch':'');
}());
// detectUseragent();

