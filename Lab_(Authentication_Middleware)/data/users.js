const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require('bcryptjs')
const saltRounds = 5;


function noUsernameCheck(val) {
    // No argument passed
    if ((val.trim()).length == 0 || (!val)) {
        throw `ERROR : Provide valid Username`;
    }
}
function noPasswordCheck(val) {
    // No argument passed
    if ((val.trim()).length == 0 || (!val)) {
        throw `ERROR : Provide valid Password`;
    }
}
function validUsernameCheck(val) {
    if ( val.length <4 ) {
        throw `ERROR : Provide valid Username`;
    }
}
function isStringCheck(val) {
    // Check if array is empty
    if (!(typeof val === "string")) {
        throw `ERROR : Input ${val} is not a String`;
    }
}
function isBlankCheck(val) {
    // Check if array is empty
    if (!val.replace(/\s/g, "").length) {
        throw `ERROR : Input parameters have a string with empty spaces`;
    }
}

const exportedMethods = {
    async createUser(username,password) {

        noUsernameCheck(username);
        isStringCheck(username);
        validUsernameCheck(username);

        let RegExp_1 =/^[a-z0-9]+$/i; 
        if (!(RegExp_1.test(username))) {
            throw `ERROR : Provide valid Username`;
        };
        
        noPasswordCheck(password);

        let RegExp_2 = /\s/g; 
        if (RegExp_2.test(password)) {
            throw `ERROR : Provide valid Password`;
        };

        if ( password.length <6 ) {
            throw `ERROR : Provide valid Password`;
        };

        

        const hash = await bcrypt.hash(password, saltRounds);
        const userCollection = await users();

        let newUser =  {   
            username: username.toLowerCase(), 
            password: hash
        };

        const new_added_user = await userCollection.findOne(
            {username: username.toLowerCase()}
        );

        // Check if username exists
        // if username does not exist, insert the user
        if (new_added_user == null) {
            let insertInfo = await userCollection.insertOne(newUser);

            if (insertInfo.insertedCount === 0) {
                return {userInserted: false}
            } else {
                return {userInserted: true}
            }
       } // If username exists
        else {
            throw "ERROR : Username already exists. Select different Username"
        }
    },

    async checkUser(username,password) {

        noUsernameCheck(username);
        isStringCheck(username);
        validUsernameCheck(username);

        let RegExp_1 =/^[a-z0-9]+$/i; 
        if (!(RegExp_1.test(username))) {
            throw `ERROR : Provide valid Username`;
        };

        noPasswordCheck(password);

        let RegExp = /\s/g; 
        if (RegExp.test(password)) {
            throw `ERROR : Provide valid Password`;
        };

        if ( password.length <6 ) {
            throw `ERROR : Provide valid Password`;
        };


        const userCollection = await users();
        const new_added_user = await userCollection.findOne(
            {username: username.toLowerCase()}
        );
        

        if (new_added_user) {
    	//here, you would get the user from the db based on the username, then you would read the hashed pw
    	//and then compare it to the pw in the req.body
	    let match = await bcrypt.compare(password, new_added_user.password);


        if (match) {
            return {authenticated: true}
        } else {
            throw "Either the username or password is invalid"
        }

        } else {
            throw "Either the username or password is invalid"
        }
    },
};

module.exports = exportedMethods;
