// © Code by T.RICKS, https://www.tricksdesign.com/
// You have the license to use this code in your projects but not redistribute it to others

// Works on internal links, ignores external links or links containing #
function internalLink(myLink) {
    return (myLink.host == window.location.host);
}
$('a').each(function() {
  if (internalLink(this) && (this).href.indexOf('#') === -1) {
  $(this).click(function(e){
  e.preventDefault();
  var moduleURL = jQuery(this).attr("href");
  setTimeout( function() { window.location = moduleURL }, 700 );
  // Class that has page out interaction tied to click
  $('.page-transition').click();
});
    }
});

(function () {
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();
