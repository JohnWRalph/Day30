"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateUserCreate(username, emailAddress, newPassword1, newPassword2, userList) {
    // const docRef = await getDocs(collection(database, "users"))
    console.log(username);
    // var userList = docRef.docs.map(doc => doc.data())
    if (!username) {
        throw Error("No username detected. Please enter a username");
    }
    if (username.length > 15) {
        throw Error(`Name is too long, maximum length is 15, recieved ${username.length}`);
    }
    if (username.length < 5) {
        throw Error(`Name is too short, minimum length is 5, recieved ${username.length}`);
    }
  
    if (!emailAddress) {
        throw Error(`No email address detected. Please enter an email address`);
    }
    if (emailAddress.length > 64) {
        throw Error(`Email is too long. Max length is 64, recieved ${emailAddress.length}`);
    }
    if (userList.find(u => u.emailAddress === emailAddress)) {
        throw Error(`Email is already being used. Select a different email`);
    }
    if (!newPassword1 || !newPassword2) {
        throw Error("Passwords are not filled out.");
    }
    if (newPassword1 !== newPassword2) {
        throw Error("Passwords do not match.");
    }
    if (newPassword1.length < 5) {
        throw Error("Minimum password length is 5.");
    }
}
exports.default = validateUserCreate;
