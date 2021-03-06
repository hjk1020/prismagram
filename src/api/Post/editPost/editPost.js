import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
    Mutation:{
    editPost:async(_,arg,{request,isAuthenticated}) =>{
        isAuthenticated(request);
        const {id, caption, location,action} = arg;
        const {user} = request;
        const post = await prisma.$exists.post({id,user:{id:user.id}})
        
        if(post){
            if(action === EDIT) {
             return prisma.updatePost({
            data:{caption,location},
            where:{id}
            });
        }else if (action === DELETE){
                return prisma.deletePost({id})
            }
       }else{
           throw Error("You can't do that");
       }
    }
}
}