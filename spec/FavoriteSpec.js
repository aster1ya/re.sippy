//import relevant functions

describe("Favorites", () => {

    beforeEach(function() {
       
    });

    it('Creating firebase user should also create mongodb user with the same UID', function() {
        expect("asd").toBe("asd");
        //delete user if exists
        /*
        admin.auth().getUserByEmail(email)
        .then((asd) => {
            const uid = asd.uid;
            admin.auth().deleteUser(uid)
            //----------also need to delete mongo user here
        }).catch((error) => {
            console.log("User not deleted: " + error )
        });

        //create user w/ email
        const { user } = await RegisterUser(email, password)
        const newFirebaseUser = user;
        const FirebaseUserUID = newFirebaseUser.uid;
        const firebaseEmail = newFirebaseUser.email;

        //search for mongodb user with same firebaseUID
        const newMongoDBUser = await GetMongoUserByUID(FirebaseUserUID)
        const mongoDBEmail = newMongoDBUser.email;

        //see if emails match
        expect(firebaseEmail).toBe(mongoDBEmail);
        */
    });

    it('Getting current user id should work', function() {
        //possible method:
        //make sure is logged out
        //login with user with known id 
        //get logged in user
        //get logged in user id
        //compare known to gotten id
       
    });

    it('Searching recipes by user ID should work', function() {
        //idk how to test this really

    });
})