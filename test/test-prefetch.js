var test = require('tape');
var prefetch = require('../index.js');

test('prefetch', function(t) {
	t.plan(3);
	prefetch.prefetch('mock-page.html', function (err, assets) {
		t.ok(!err, 'No errors should be returned');
		t.equal(assets.length, 3, '3 Assets should have been fetched');
		t.equal(document.getElementsByTagName('img').length, 3, '3 images should have been created');
	});
});