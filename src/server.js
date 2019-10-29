
import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

import {authenticateJwt} from "./passport";
import {isAuthenticated} from "./middlewares"
import './env';



const PORT = process.env.PORT || 5000;



const server = new GraphQLServer({schema,
    context:({request})  =>({request,isAuthenticated})});



server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.start({port:5000}, () =>
console.log( `Server running localhost:${PORT}`)
);