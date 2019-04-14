function checkConnection(cb) {
	require('dns').lookup('mlab.com', (err) => {
		if (err && err.code === 'ENOTFOUND') {
			cb(false);
		} else {
			cb(true);
		}
	});
}

module.exports = checkConnection;
