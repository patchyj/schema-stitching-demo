import nodemailer from 'nodemailer';
import config from '../config';

export default async function (recipients, { subject, text, html }) {
	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		service: config.SERVICE,
		auth: {
			user: config.USER_EMAIL,
			pass: config.USER_PASSWORD
		}
	});

	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: 'noreply@jjwmcgregor.com', // sender address: defaults to config.USER_EMAIL if not explicitly defined
		to: recipients, // list of receivers
		subject, // Subject line
		text, // plain text body
		html // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
