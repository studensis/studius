import * as trpcExpress from '@trpc/server/adapters/express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import customConfig from './config/default';
import appRouter from './controllers/router';
import { createContext } from './controllers/trpc';

// ---------

const app = express();

// request logger
app.use((req, res, next) => {
	console.log('');
	console.log('⬅️ ', req.method, req.path);
	next();
});

app.use(
	cors({
		origin: [
			customConfig.origin,
			'http://localhost:3000',
			'https://studius-eta.vercel.app',
			'*.vercel.app',
		],
		credentials: true,
	})
);

app.use(cookieParser());

app.get('/', (req, res) => res.send('Welcome to Studius Backend v1.0.0'));

app.use(
	'/',
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);

app.use(bodyParser.urlencoded({ extended: false }));

// const port = customConfig.port;
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.clear();
	console.log(`🚀 Server listening on port ${port}`);
});

// router(app);

export type AppRouter = typeof appRouter;
