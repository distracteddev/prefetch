var test = require('tape');
var prefetch = require('../index.js');

test('prefetch', function(t) {
	t.plan(2);
	prefetch.prefetch('mock-page.html', function (err, assets) {
		t.ok(!err);
		t.equal(assets.length, 3);
	});
});