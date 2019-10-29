import { prisma } from "../../../../generated/prisma-client";


export default {
    Query:{
        searchPost: async(_,args) =>{ 
            const {term} = args;
            if(term.length>0){
           const post = await prisma.posts({
               where: {
                   OR: [{
                       location_starts_with: term},
                    {caption_starts_with: term}]
                }});
                    return post;
    }else{
        throw Error ("당신은 찾을수 없습니다 ");
    }
}
}
}