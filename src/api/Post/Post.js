import { prisma } from "../../../generated/prisma-client";


export default {
    Post: {

      files: parent => prisma.post({id: parent.id}).files(), // {id} => prisma.post({id}).files()로 바꾸기도 가능함
    Comments: parent => prisma.post({id: parent.id}).Comments(),
    user: parent => prisma.post({id: parent.id}).user(),

    isLiked: (parent,_, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });

    },
    likeCount: (parent) =>  prisma.likesConnection(
        {where:
            {post:
                {id:parent.id}}})
    .aggregate().count()
    
        
    

}
}