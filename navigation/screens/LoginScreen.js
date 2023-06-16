import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Button,
} from "react-native";
import auth from "@react-native-firebase/auth";
import Welcome from "../../components/Welcome";
// import * as AuthSession from "expo-auth-session";
// import * as Facebook from "expo-auth-session/providers/facebook";
// import * as WebBrowser from "expo-web-browser";
// import { FACEBOOK_APP_ID } from "@env";

// WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState("");
  const [signIn, setSignIn] = useState(false);
  // const [request, response, promptAsync] = Facebook.useAuthRequest({
  //   clientId: FACEBOOK_APP_ID,
  // });
  const login = () => {
    setUser(true);
  };
  const logout = () => {
    console.log("logout");
    setUser(false);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };
  // const handlePressAsync = async () => {
  //   console.log("Facebook sign in clicked");
  //   const result = await promptAsync();
  //   if (result.type !== "success") {
  //     alert("Uh oh, something went wrong");
  //     return;
  //   }
  // };
  // React.useEffect(() => {
  //   if (response && response.type === "success" && response.authentication) {
  //     (async () => {
  //       const userInfoResponse = await fetch(
  //         `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
  //       );
  //       const userInfo = await userInfoResponse.json();
  //       setUser(userInfo);
  //     })();
  //   }
  // }, [response]);

  return (
    <>
      {user ? (
        <Welcome logout={logout} />
      ) : (
        <ImageBackground
          source={require("../../assets/login.jpg")}
          style={styles.backgroundImage}
        >
          <Text style={styles.title}>Login Screen</Text>
          <TouchableOpacity>
            <Button
              // disabled={!request}
              title="Sign in with Facebook"
              // onPress={handlePressAsync}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button title="Login with Google" onPress={handleGoogleLogin} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Login Successful</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#a10a0a",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
