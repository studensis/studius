import * as trpcExpress from '@trpc/server/adapters/express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import customConfig from './config/default';
// import { createContext } from './context';
import router from './controllers/router';
import { createContext } from './controllers/trpc_context';
import appRouter from './controllers/trpc_router';

// ---------

const app = express();

// request logger
app.use((req, _res, next) => {
	console.log('');
	console.log('⬅️ ', req.method, req.path);
	// console.log('body \t', req.body);
	// console.log('query \t', req.query);
	// console.log('params \t', req.params);
	next();
});

app.use(
	cors({
		origin: [customConfig.origin, 'http://localhost:3000'],
		credentials: true,
	})
);

app.use(cookieParser());

app.use(
	'/trpc',
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_req, res) => res.send('hello'));

const port = customConfig.port;

app.listen(port, () => {
	console.clear();
	console.log(`🚀 Server listening on port ${port}`);
});

router(app);

export type AppRouter = typeof appRouter;
