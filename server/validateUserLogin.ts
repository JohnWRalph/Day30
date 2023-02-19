import * as jwt from "jsonwebtoken"


function validateUserLogin(emailAddress: string, password: string) {


    // const docRef = await getDocs(collection(database, "users"))

    // var userList = docRef.docs.map(doc => doc.data())
    if (!emailAddress) {
        throw Error("No email address entered.")
    }
    if (!password) {
        throw Error("No password entered.")
    }

 

}

export default validateUserLogin