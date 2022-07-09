import { Auth } from "aws-amplify";
export const signIn = async ({ email, password }) => {
  try {
    const user = await Auth.signIn(email, password);
    return user;
  } catch (e) {
    throw new Error("Invalid Login");
  }
};
export const handleNewPasswordChallenge = async (userObject, newPassword) => {
  try {
    const response = await Auth.completeNewPassword(
      userObject,
      newPassword,
      {}
    );
  } catch (e) {
    throw new Error("An Error Occured");
  }
};
export const signOut = async (user) => {
  try {
    const response = await Auth.signOut();
    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};
