import { Server } from '@overnightjs/core';
import express from 'express'
import { expressjwt } from 'express-jwt';
import { config } from './config';
import { Algorithm } from 'jsonwebtoken';
import * as controllers from './controllers';
import cors from 'cors';
import { errorMiddleware } from './middlwares/response.middlware';
import connectToDatabase from './db';

class App extends Server {

    PORT = config.PORT;

    private jwtEscapeUrls = [ /^\/public(\/|$)/ ];

    constructor() {
        super(true);
        this.initializeServer();
    }

    private async initializeServer() {
        this.app.use(express.json());

        this.app.use(cors({
            origin: ['http://localhost:3000', 'https://stock-flow-mvp-web.vercel.app'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: false
        }))

        this.app.use(expressjwt({
            secret: config.JWT_SECRET, 
            algorithms: [ config.JWT_ALGORITHM as Algorithm ] 
        }).unless({
            path: this.jwtEscapeUrls
        }));

        // connecting to db
        await connectToDatabase();

        this.setupControllers();

        this.app.use(errorMiddleware);
    }

    private setupControllers() {
        const controllerInstances = [];

        for(const name of Object.keys(controllers)) {
            const controllerClass = (controllers as any)[name];
            if(typeof controllerClass === 'function') {
                controllerInstances.push(new controllerClass());
            }
        }

        this.addControllers(controllerInstances);
    }
}

const server = new App();

server.app.listen(server.PORT, () => {
    console.log(`Server listening on PORT: ${server.PORT}`);
})

