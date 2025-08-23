import { Text, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useState } from "react";

GoogleSignin.configure({
  webClientId: '374079374603-4n31ke52ke0v4n6n6nhuan30pp63rmae.apps.googleusercontent.com', 
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], 
  offlineAccess: true, 
  forceCodeForRefreshToken: true, 
  iosClientId: '374079374603-kuoc5mbfkvtl53i58fhlrte49hec0u6l.apps.googleusercontent.com', 
});

// WebClient ID = 374079374603-4n31ke52ke0v4n6n6nhuan30pp63rmae.apps.googleusercontent.com
// WebClient Secret = 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
// Android Client ID = 374079374603-uo7d8o0hga1kninpe3dq1jibk5201an4.apps.googleusercontent.com
// IOS Client ID = 374079374603-kuoc5mbfkvtl53i58fhlrte49hec0u6l.apps.googleusercontent.com
// IOS URL Scheme = com.googleusercontent.apps.374079374603-kuoc5mbfkvtl53i58fhlrte49hec0u6l

export default function Index() {
  const [userData, setuserData] = useState([]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response);
      setuserData(response?.data)
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log("SIGN_IN_CANCELLED Error")
            break;
          case statusCodes.IN_PROGRESS:
            console.log("IN_PROGRESS")
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("PLAY_SERVICES_NOT_AVAILABLE")
            break;
          default:
            console.log("Other 1: ", error)
        }
      } else {
        console.log("Other 2: ", error)
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>OAuth - Login with Google</Text>
      <Text>{userData.idToken}</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
}
