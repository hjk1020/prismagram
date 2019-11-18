import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        posts: ({id}) => prisma.user({id}).posts(),
        following: ({id}) => prisma.user({id}).following(),
        followers: ({id}) => prisma.user({id}).followers(),
        likes: ({id}) => prisma.user({id}).likes(),
        Comments: ({id}) => prisma.user({id}).Comments(),
        rooms: ({id}) => prisma.user({id}).rooms(),
        postsCount: ({id}) => 
        prisma.postsConnection({where:{user:{id}}})
        .aggregate()
        .count(),
    followingCount:({id})=>
    prisma.
    usersConnection({where:{followers_some:{id}}})
    .aggregate()
        .count(),
    followersCount:({id})=>
    prisma.
    usersConnection({where:{following_none:{id}}})
    .aggregate()
        .count(),


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
    catch{
        
        return false;

    }

},
isSelf: (parent,_,{request}) => {
    const {user} = request;
    const {id:parentId} = parent;
    return user.id === parentId;
}

}
}
