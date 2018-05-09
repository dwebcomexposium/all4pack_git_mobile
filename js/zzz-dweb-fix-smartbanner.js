jQuery(function($){

 var iOSs = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
 var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
 
 /*if (iOSs == true) {
  $('#smartbanner').attr("style", "display: none !important");
 }*/

 if (isSafari == true) {
  $('#smartbanner').attr("style", "display: none !important");
 }

function iOSversion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
}

ver = iOSversion();

if (ver[0] <= 9) {
  $('#smartbanner').attr("style", "display: block !important");
}

});