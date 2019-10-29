import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
    fullName: parent => {
        return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: (parent,_,{request}) =>{
        const {user} = request;
        const {id:parentId /*id를 가져와서 parentId에 넣는다*/} = parent;
        try{
        return  prisma.$exists.user({
            AND: [
                {id:user.id}, 
                { following_some: {id: parentId}}
            ]
        });
       
        
        }
    catch(e){
        console.log(e);
        return false;

    }

},
isSelf: (parent,_,{request}) => {
    const {user} = request;
    const {id:parentId} = parent;
    return user.id === parentId;
}

},
}
