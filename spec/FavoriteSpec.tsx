// import {
//   GetMongoUserByUID,
//   RegisterUser,
//   AdminDeleteUserByEmail,
// } from "@/controller";

describe("Favorites", () => {
  beforeEach(function () {});

  it("Creating firebase user should also create mongodb user with the same UID", async () => {
    //delete user if exists
    /*
    const email = "testemail123@gmail.com";
    const password = "testpassword123;";

    await AdminDeleteUserByEmail(email);

    //create user w/ email
    const { user } = await RegisterUser(email, password);
    const newFirebaseUser = user;
    if (newFirebaseUser) {
      const firebaseUserUID = newFirebaseUser.uid;
      const firebaseEmail = newFirebaseUser.email;

      //search for mongodb user with same firebaseUID
      const newMongoDBUser = await GetMongoUserByUID(firebaseUserUID);
      const mongoDBEmail = newMongoDBUser.email;

      //see if emails match
      expect(firebaseEmail).toBe(mongoDBEmail);
    } else {
      fail("firebase user not created/found");
    }
      */
  });

  it("Getting current user id should work", function () {
    //possible method:
    //make sure is logged out
    //login with user with known id
    //get logged in user
    //get logged in user id
    //compare known to gotten id
  });

  it("Searching recipes by user ID should work", function () {
    //idk how to test this really
  });
});
