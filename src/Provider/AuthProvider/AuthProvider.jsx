import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import auth from "../../Firebase/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

// app
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // create User

  const createUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  // login user
  const logIn = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  // Google sign in

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // update user
  const updateUser = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ONAUTH STATE CHANGE
  useEffect(() => {
    const unsubscrube = onAuthStateChanged(auth, (currentUser) => {
      console.log("current User ", currentUser);
      setUser(currentUser);
      if (currentUser) {
        console.log(currentUser);

        const userInfo = { email: currentUser?.email };
        // sent useremail and get token in response and save it in 1 cookies 2. or localstorage or state/memory
        axiosPublic.post("/jwt", userInfo).then((res) => {
          // console.log("token", res.data.token);
          if (res.data.token) {
            localStorage.setItem("access-token", res?.data?.token);
            setLoading(false);
          }
        });
      } else {
        //erase the token from locastorage or cookie or caching or memory
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscrube();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    logIn,
    logOut,
    updateUser,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
