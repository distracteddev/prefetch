function httpGet(theUrl, cb) {
  cb = cb || function() {};

  // browser cruft
  var httpRequest;
  if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {}
    }
  }

  if (!httpRequest) {
    cb('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  httpRequest.open( "GET", theUrl);
  httpRequest.send();
  httpRequest.onreadystatechange = function() {
  	if (httpRequest.readyState === 4) {
  	    // everything is good, the response is received
  	    if (httpRequest.status === 200) {
  	    	cb(null, httpRequest.responseText, httpRequest);
          // console.log(httpRequest.getAllResponseHeaders());
  	    } else {
  	    	cb('Error: Request for url ' + theUrl + ' received code ' + httpRequest.status);
  	    }
  	} else {
  	    // still not ready
  	   return
  	}
  }
}

function getAttributes(elems, attr) {
  var attrs = [];
  for (var i=0; i < elems.length; i++) {
    var value = elems[i].getAttribute(attr);
    if (value) { attrs.push(value); }
  }
  return attrs;
}

function findDocumentAssets(htmlString) {
  var assetUrls = [];
  var doc = document.implementation.createHTMLDocument("example");
  doc.documentElement.innerHTML = htmlString;
  var scripts = doc.getElementsByTagName("script");
  var styles = doc.getElementsByTagName("link");

  assetUrls.push.apply(assetUrls, (getAttributes(scripts, "src")));
  assetUrls.push.apply(assetUrls, (getAttributes(styles, "href")));

  return assetUrls;
}


function prefetch(url, cb) {
	cb = cb || function() {};
  httpGet(url, function(err, data) {
    window.responseData = data;
    var assets = findDocumentAssets(data);
    assets.forEach(function(url) {
      var el = document.createElement('img');
      el.setAttribute("src", url);
      el.setAttribute("style", "display: none;");
      document.getElementsByTagName('body')[0].appendChild(el);
    });
    cb(null, assets);
  });
}


exports.prefetch = prefetch;
exports.findDocumentAssets = findDocumentAssets;
exports.httpGet = httpGet;

