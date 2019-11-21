
import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import {uploadController,uploadMiddleware} from "./upload";
import {authenticateJwt} from "./passport";
import {isAuthenticated} from "./middlewares"
import './env';



const PORT = process.env.PORT || 5000;



const server = new GraphQLServer({schema,
    context:({request})  =>({request,isAuthenticated})});

    //passport 안에 있는 req.request를 받는다



server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload",uploadMiddleware,uploadController)

server.start({port:4000}, () =>
console.log( `Server running localhost:${PORT}`)
);