export const confirmAccount = ({ name, token }) => (
	{
		subject: 'Account confirmation',
		text: 'Please confirm your account by clicking on the following link',
		html: ` 
            <body>
                <h1>Hi ${name}</h1>
                <p>Please confirm your account by clicking on the following link.</p>
                <p><a href="http://localhost:4000/token/${token}" target="_blank">Verify</a></p>
            </body>
        `
	}
);

export const welcomeEmail = ({ name }) => (
	{
		subject: 'Welcome',
		text: 'Welcome to your new portfolio!',
		html: ` 
        <body>
            <h1>Hi ${name}</h1>
            <p>Welcome to your new portfolio!</p>
        </body>
        `
	}
);

export const passwordReset1 = ({ name, token }) => (
	{
		subject: 'Password reset request',
		text: 'Please click on the following link to reset your password',
		html: ` 
        <body>
            <h1>Hi ${name}</h1>
            <p>Please click on the following link to reset your password</p>
            <p><a href="http://localhost:4000/token/${token}" target="_blank">Reset Password</a></p>
            <p>The link will expire in 10 minutes</p>
        </body>
        `
	}
);

export const passwordReset2 = ({ name }) => (
	{
		subject: 'Password reset success',
		text: 'Your password has been updated',
		html: ` 
        <body>
            <h1>Hi ${name}</h1>
            <p>Your password has been updated</p>
            <p>Not you? Uh-oh!</p>
        </body>
        `
	}
);

export const deleteAccount1 = ({ name, token }) => (
	{
		subject: 'Delete account confirmation',
		text: 'Click the link to confirm you want to delete your account',
		html: ` 
        <body>
            <h1>Hi ${name}</h1>
            <p>Click the link to confirm you want to delete your account</p>
            <p><a href="http://localhost:4000/token/${token}" target="_blank">Verify</a></p>
        </body>
        `
	}
);

export const deleteAccount2 = ({ name }) => (
	{
		subject: 'Delete account confirmation',
		text: 'Your account has just been successfully deleted',
		html: ` 
        <body>
            <h1>Hi ${name}</h1>
            <p>Your account has just been successfully deleted</p>
        </body>
        `
	}
);
