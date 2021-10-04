import { initializeApp } from "firebase/app";

export const firebaseConfig = (): void => {
  const config = {
    apiKey: "AIzaSyDDW41vxHlNbxtMbyHfZDMDoc-fwdbDiF4",
    authDomain: "mintic-factory-tracker.firebaseapp.com",
    databaseURL: "https://mintic-factory-tracker-default-rtdb.firebaseio.com",
    projectId: "mintic-factory-tracker",
    storageBucket: "mintic-factory-tracker.appspot.com",
    messagingSenderId: "663963470143",
    appId: "1:663963470143:web:828c618a74369bf517eb8a"
  };
  
  // const app = initializeApp(config);
  initializeApp(config);
}
