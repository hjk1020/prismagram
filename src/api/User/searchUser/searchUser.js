import { prisma } from "../../../../generated/prisma-client";


export default {
    Query:{
        searchUser: async(_,args) => {
            const {term} = args;
            if(term.length>0){
            const user = await prisma.users({
            where: {
              
                OR: [
                    { userName_contains: term},
                    { firstName_contains:term},
                    { lastName_contains: term}
                ]
            } 
        
        });
         return user;
    }else{
            throw Error( "당신은 검색할수 없습니다 ");
        }
       
            
        
    }

}}
