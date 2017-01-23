import { AngularFireModule, AuthMethods, AuthProviders } from "angularfire2";

export const afConfig = {
  apiKey: "AIzaSyBXCuM8IYnfFzqmPucXZ7onZFnxLWRdSAA ",
  authDomain: "angular-pinterest.firebaseapp.com",
  databaseURL: "https://angular-pinterest.firebaseio.com",
  storageBucket: "angular-pinterest.appspot.com",
  messagingSenderId: "590639288494"
};

export const afAuthConfig = {
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
};