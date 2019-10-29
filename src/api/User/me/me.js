import { prisma } from "../../../../generated/prisma-client";
import {isAuthenticated} from "../../../middlewares";

export default {
    Query: {
        me:async (_,__,{request}) => {
            isAuthenticated(request);
            const {user} = request;
            const userProfile = await prisma.user({id:user.id});
            const posts = await prisma.user({id:user.id}).posts()// post만 전달할꺼면 .post() 그러나 유저와 post를 둘다 할꺼면 $fragment
        return {
            user:userProfile,
            posts
        }
        

        }
        }
    }
  