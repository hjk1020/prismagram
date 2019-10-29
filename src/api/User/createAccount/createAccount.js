import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async (_,arg) => {
            const { userName, email, firstName="", lastName="", bio=""} = arg;
            
            const user = await prisma.createUser({
                userName,
                email,
                firstName,
                lastName,
                bio
            });
            return user;
        }
    }
}