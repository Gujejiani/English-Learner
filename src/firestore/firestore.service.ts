import { AuthService } from "../auth/auth.service";
import { collection, doc, setDoc, getDoc, } from 'firebase/firestore';

class FireStoreClass extends AuthService {

   


    async saveDataInCollection( data: string[]) {
                const user =   this.auth.currentUser
          //  console.log('USER ', user, this.auth.currentUser, data)
            try{

          
            if (user) {
              const userId = user.uid;
              
             


              // Reference the collection specific to the user
              const usersCollection = collection(this.db, 'users');

              // Reference a specific document within the 'users' collection
              const userDoc = doc(usersCollection, userId);
              // Save data to this user's collection
              await setDoc(userDoc, { hardWords: data });

            }
          }catch(err){ console.log(err)
          }
    }

 async   getUserHardWords() {
  const user =   this.auth.currentUser
  let hardWordsObj = {hardWords: []}
      try{
        const usersCollection = collection(this.db, 'users');
        const userDoc = doc(usersCollection, user.uid);
        // To get data from the user's document
      const userDocSnapshot = await getDoc(userDoc);
      // Check if the document exists
        if (userDocSnapshot.exists()) {
          // Access the data in the document
          const userData = userDocSnapshot.data();
          // console.log('HERE We GI ', userData)
       
          return userData as {hardWords: string[]}
          // Now, userData contains the data from the user's document
          // You can access specific fields like userData.hardWords
        } else {
          // The document does not exist
          console.log("User document does not exist.");
        }
      }catch (err){
        console.log(err)
      }
     return hardWordsObj
    }
}



export const FireStore = new FireStoreClass()