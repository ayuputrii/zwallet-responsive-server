const db = require('../config/mysql');

module.exports = {
	searchAll: function(id) {
		return new Promise((resolve, reject) => {
			db.query(
				'SELECT name, phone, photo, balance FROM users WHERE id <> ? AND role <> 6 ORDER BY name ASC',
				id,
				(err, result) => {
					if (!err) {
						resolve(result);
					} else {
						reject(new Error(err));
					}
				}
			);
		});
	},
	searchOneById: function(phone, token_id) {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT name, phone, photo, balance FROM users WHERE phone=${phone} AND role <> 6 AND id <> ${token_id}`,
				(err, result) => {
					if (!err) {
						resolve(result);
					} else {
						reject(new Error(err));
					}
				}
			);
		});
	},
	searchByName: function(id, name) {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT name, phone, photo, balance FROM users WHERE name LIKE '%${name}%' AND id <> ${id} AND role <> 6 ORDER BY name ASC`,
				(err, result) => {
					if (!err) {
						resolve(result);
					} else {
						reject(new Error(err));
					}
				}
			);
		});
	},
	getAllUser: function() {
		return new Promise((resolve, reject) => {
			db.query('SELECT * FROM users', (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	},
	getUserLogin: function(id) {
		return new Promise((resolve, reject) => {
			db.query(`SELECT name, email, photo, phone, balance, verified FROM users WHERE id=${id}`, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	},
	getUserDevice: function(token) {
		return new Promise((resolve, reject) => {
			db.query(
				'SELECT id, name, email, photo, phone, balance, verified FROM users WHERE device_token=?',
				token,
				(err, result) => {
					if (!err) {
						resolve(result);
					} else {
						reject(new Error(err));
					}
				}
			);
		});
	},
	getUserPhone: function(phone) {
		return new Promise((resolve, reject) => {
			db.query(
				'SELECT id, name, email, photo, phone, balance, verified, device_token FROM users WHERE phone=?',
				phone,
				(err, result) => {
					if (!err) {
						resolve(result);
					} else {
						reject(new Error(err));
					}
				}
			);
		});
	},
	editUser: function(id, setData) {
		return new Promise((resolve, reject) => {
			db.query(`UPDATE users SET ? WHERE id=${id}`, setData, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	}
};
