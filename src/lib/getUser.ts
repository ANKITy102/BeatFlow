import { getSession } from "next-auth/react"

const getUserData =async () =>{
    const session =await getSession();
    if(session){

        // console.log(session.user);
        return session.user;
    }

    // return session.user;
}
export default getUserData;