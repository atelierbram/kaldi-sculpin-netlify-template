(function() {

// http://bittersmann.de/lib/backlink/backlink.js
var revHelpLinkElement = document.querySelector('link[rev="help"][href]:not([href=""])');
if (revHelpLinkElement && revHelpLinkElement.href) {
  var aElement = document.createElement('a');
  aElement.rev = revHelpLinkElement.rev;
  aElement.href = revHelpLinkElement.href;
  aElement.target = '_blank';
  aElement.innerHTML = 'Backlink <span>to the repo for this template</span>';
  document.body.appendChild(aElement);

// no need to create a link element for the styling here on Codepen, just use the url of this pen as a resource behind the CSS-tab gear icon
//  var styleheetLinkElement = document.createElement('link');
//  styleheetLinkElement.rel = 'stylesheet';
//  styleheetLinkElement.href = '//bittersmann.de/lib/backlink/backlink.css';
//  document.head.appendChild(styleheetLinkElement);
}
}());
