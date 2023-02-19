"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateUserLogin(emailAddress, password) {
    // const docRef = await getDocs(collection(database, "users"))
    // var userList = docRef.docs.map(doc => doc.data())
    if (!emailAddress) {
        throw Error("No email address entered.");
    }
    if (!password) {
        throw Error("No password entered.");
    }
}
exports.default = validateUserLogin;
