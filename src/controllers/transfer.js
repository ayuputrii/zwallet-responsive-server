const { response } = require('../helpers');
const { getUserPhone } = require('../models/user');
const transferModel = require('../models/transfer');
const admin = require('firebase-admin');

module.exports = {
	getHistoryUser: async function(req, res) {
		try {
			const { id } = req.token;
			let { order } = req.query;
			const result = await transferModel.getHistoryUser(id, order);
			response(res, 200, result);
		} catch (error) {
			res.status(500).send({
				message: error.message
			});
		}
	},
	getAllHistoryUser: async function(req, res) {
		try {
			const { id } = req.token;
			const result = await transferModel.getAllHistoryUser(id);
			console.log(result);
			response(res, 200, result);
		} catch (error) {
			res.status(500).send({
				message: error.message
			});
		}
	},
	getHistoryToday: async function(req, res) {
		try {
			const { id } = req.token;
			const result = await transferModel.getHistoryToday(id);
			response(res, 200, result);
		} catch (error) {
			response(res, 500, { message: error.message });
		}
	},
	getHistoryByFilter: async function(req, res) {
		try {
			const { id } = req.token;
			const { start, end } = req.query;
			const result = await transferModel.getHistoryByFilter(start, end, id);
			response(res, 200, result);
		} catch (error) {
			response(res, 500, { message: error.message });
		}
	},
	postTransfer: async function(req, res) {
		try {
			const pinBody = req.body.pin;
			const { id, pin } = req.token;
			if (pinBody == pin) {
				const { phone_receiver } = req.body;
				const receiver = await getUserPhone(phone_receiver);
				if (receiver[0].device_token) {
					await admin.messaging().sendToDevice(receiver[0].device_token, {
						notification: {
							title: 'Transfer',
							body: 'Kamu menerima transfer sebesar ' + req.body.amount
						},
						data: {
							balance: req.body.amount
						}
					});
				}

				const setData = req.body;
				delete setData.pin;
				delete setData.phone_receiver;
				setData.id_sender = id;
				const result = await transferModel.postTransfer(phone_receiver, setData);
				res.status(201).send({
					message: 'Success created a transfer',
					data: result
				});
			} else {
				res.status(403).send({
					message: 'Invalid PIN'
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).send({
				message: error.message
			});
		}
	}
};
