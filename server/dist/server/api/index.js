"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const uuid_1 = require("uuid");
const validateUserCreate_1 = __importDefault(require("../../validateUserCreate"));
const dotenv_1 = __importDefault(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
const argon2_1 = require("argon2");
const jwt = __importStar(require("jsonwebtoken"));
const validateUserLogin_1 = __importDefault(require("../../validateUserLogin"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
let errorMessage;
let alertMessage;
const apiKey = process.env.FIREBASECONFIG_APIKEY;
const authDomain = process.env.FIREBASECONFIG_AUTHDOMAIN;
const projectId = process.env.FIREBASECONFIG_PROJECTID;
const storageBucket = process.env.FIREBASECONFIG_STORAGEBUCKET;
const messageSenderId = process.env.FIREBASECONFIG_MESSAGINGSENDERID;
const appId = process.env.FIREBASECONFIG_APPID;
const measurementId = process.env.FIREBASECONFIG_MEASUREMENTID;
const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messageSenderId,
    appId,
    measurementId
};
const firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
const jwtKey = process.env.JWTKEY;
app.get('/user', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const database = (0, firestore_1.getFirestore)(firebaseApp);
        const docRef = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(database, "users"));
        var userList = docRef.docs.map(doc => doc.data());
        res.send(userList);
    });
});
//User verify and login
app.post("/login", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // require email and password input
        const emailAddress = req.body.emailAddress;
        const password = req.body.password;
        console.log(emailAddress);
        console.log(password);
        // compare req and stored hashed passwords
        const database = (0, firestore_1.getFirestore)(firebaseApp);
        const docRef = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(database, "users"));
        var userList = docRef.docs.map(doc => doc.data());
        const user = userList.find(user => user.user.emailAddress === emailAddress);
        if (!user) {
            errorMessage = "Incorrect email/password combination";
            res.send({ error: errorMessage });
            return;
        }
        try {
            (0, validateUserLogin_1.default)(emailAddress, password);
        }
        catch (e) {
            errorMessage = e.message;
            res.send({
                error: e.message
            });
            return;
        }
        console.log("user", user);
        // send back error if pass doesn't match OR generate JWT and send back user
        const isPasswordcorrect = yield (0, argon2_1.verify)(user.user.hashedPassword, password);
        console.log(isPasswordcorrect);
        if (!isPasswordcorrect) {
            errorMessage = "wrong password";
            res.send({ error: errorMessage });
        }
        else {
            const token = yield jwt.sign({ id: user.user.userid }, jwtKey, { expiresIn: "1800s" });
            res.status(200).send({
                user: user.user,
                token: token
            });
        }
    });
});
//user Creation
app.post('/user', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const database = (0, firestore_1.getFirestore)(firebaseApp);
        const docRef = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(database, "users"));
        var userList = docRef.docs.map(doc => doc.data());
        const users = [];
        userList.forEach(function (element) {
            users.push(element.user);
        });
        userList = users;
        // console.log("weewoo",userList)
        const username = req.body.username;
        const emailAddress = req.body.emailAddress;
        const userid = (0, uuid_1.v4)();
        const newPassword1 = req.body.newPassword1;
        const newPassword2 = req.body.newPassword2;
        //end ToDo
        // console.log("usre",userList)
        // validate
        try {
            (0, validateUserCreate_1.default)(username, emailAddress, newPassword1, newPassword2, userList);
        }
        catch (e) {
            errorMessage = e.message;
            res.send({
                error: e.message
            });
            return;
        }
        const hashed = yield (0, argon2_1.hash)(newPassword1.toString());
        console.log(hashed);
        const user = {
            userid: userid,
            username: username,
            emailAddress: emailAddress,
            hashedPassword: hashed
        };
        yield (0, firestore_1.setDoc)((0, firestore_1.doc)(database, "users", userid), {
            user
        });
        res.send(user);
    });
});
// .put lets user change their name or email
// AUTHENTICATED ROUTE, user must have a VALID JWT signed by OUR SIGNING KEY
// to edit this user, and the USER ID of the JWT must be the user they are TRYING TO EDIT
// they cannot use ANY signed JWT key
app.put("/user/:userId", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).send({ error: "no auth header" });
        }
        // Bearer 
        console.log("auth", authHeader);
        const token = authHeader.split(" ")[1];
        console.log("token:", token.toString());
        console.log("jwt", jwtKey);
        if (!token) {
            return res.status(400).send({ error: "no token in auth header" });
        }
        jwt.verify(token, jwtKey, function (err, decodedUser) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    errorMessage = "invalid token";
                    return res.send({ error: errorMessage });
                }
                if (decodedUser.id !== userId) {
                    console.log("decoded", decodedUser);
                    console.log("id", decodedUser.id);
                    console.log("userid", userId);
                    errorMessage = "Not authorized user. Must be signed in to an account to change preferences";
                    return res.send({ error: errorMessage });
                }
                else {
                    const newUsername = req.body.newUsername;
                    const newEmailAddress = req.body.newEmailAddress;
                    const database = (0, firestore_1.getFirestore)(firebaseApp);
                    const docRef = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(database, "users"));
                    var userList = docRef.docs.map(doc => doc.data());
                    // try {
                    //     validateUserCreate(newUsername, newEmailAddress, userList)
                    // } catch (e) {
                    //     errorMessage = e.message
                    //     res.send({
                    //         error: e.message
                    //     })
                    //     return;
                    // }
                    const user = {
                        userid: userId,
                        username: newUsername,
                        emailAddress: newEmailAddress
                    };
                    console.log("newuser", user);
                    yield (0, firestore_1.setDoc)((0, firestore_1.doc)(database, "users", userId), {
                        user
                    });
                    alertMessage = "Preferences Updated";
                    res.send(user);
                }
            });
        });
    });
});
app.listen(3000);
