import { getAuth, signInWithCustomToken } from "firebase/auth";


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";



export class AuthService  {
    
 auth: any
 app: any
 db: any     
 async  initializeFirebase(){
    
     const app = await initializeApp(this.firebaseConfig());

     this.app = app
     this.auth = await getAuth(app)
     await getAnalytics(app)
     this.db = await getFirestore(this.app)
  
   }


 async loginInFirebase(getToken: any){
  const token = await getToken({ template: "integration_firebase" }) as string;
 await signInWithCustomToken(this.auth, token) as any;
  //]]console.log("user ::", userCredentials, token);
 }

   


   private  firebaseConfig (){ 
      //  console.log( process.env.REACT_APP_FIREBASE_API_KEY, process.env.REACT_APP_CLERK_PUBLISHABLE_KEY)
      //   console.log(process.env.REACT_APP_FIREBASE_API_KEY)
       return  {
     
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID
     };}

    


}


