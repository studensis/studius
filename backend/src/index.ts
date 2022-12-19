console.log('hello world');

import express from 'express';
import router from './controllers/router';

const app = express();
const port = process.env.PORT || 4000;

// // const client = await new PrismaClient();

app.listen(port, () => {
	console.log(
		`Timezones by location application is running on port ${port}.`
	);
});

router(app);
