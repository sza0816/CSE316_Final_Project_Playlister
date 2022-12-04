import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    OPEN_MODAL:"OPEN_MODAL",
    CLOSE_MODAL: "CLOSE_MODAL"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errMsg: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errMsg: null
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errMsg: null
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errMsg: null
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errMsg: null
                })
            }
            case AuthActionType.OPEN_MODAL:{
                return setAuth({
                    user: null,
                    loggedIn:false,
                    errMsg: payload.errMsg
                })
            }
            case AuthActionType.CLOSE_MODAL:{
                return setAuth({
                    user: null,
                    loggedIn:false,
                    errMsg: null
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(Username, firstName, lastName, email, password, passwordVerify) {
        let response;
        try{
            response = await api.registerUser(Username, firstName, lastName, email, password, passwordVerify);  
        }catch(error){
            console.log("error 401");
            let errMsg = error.response.data.errorMessage;
            authReducer({
                type: AuthActionType.OPEN_MODAL,
                payload: {
                    errMsg: errMsg
                }
            })
            // history.push("/");
            console.log(auth.errMsg != null + "--------"+auth.errMsg);
            return;
        }
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/login");
            auth.logoutUser();
            
            // history.push("/");
            // auth.loginUser(email,password);
        }
    }

    auth.loginUser = async function(email, password) {
        let response;
        try{
            response=await api.loginUser(email, password);
        }catch(error){
            let errMsg=error.response.data.errorMessage;
            console.log("error 400",errMsg);
            authReducer({
                type: AuthActionType.OPEN_MODAL,
                payload: {
                    errMsg: errMsg
                }
            })
            // history.push("/login");
            console.log(auth.errMsg != null,"########",auth.errMsg);
            return;
        }
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    auth.getUsername=function(){
        let Username="";
        if(auth.user){
            Username+=auth.user.Username;
        }
    }

    auth.closeModal = function(){
        authReducer( {
            type: AuthActionType.CLOSE_MODAL,
            payload: null
        })
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };