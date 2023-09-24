
import './App.css';
import Header from './components/header/header';
import { Route, Switch} from 'react-router-dom'
import FormPage from './pages/formPage';
import DashboardPage from './pages/vocabulary-page';

import AboutPage from './pages/about-page';

import HardWordsPage from './pages/hard-words-page';
import { useEffect } from 'react';
import { vocabularyActions } from './store/vocabulary-slice';
import store from './store/reducer';
import { LangMode } from './models';
import DataModifier from './utils/DataModifier'
import { ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,  } from "@clerk/clerk-react";
import { FireStore } from './firestore/firestore.service';
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {

  useEffect(()=>{
  
    const vocabulary = localStorage.getItem('vocabulary')? JSON.parse(localStorage.getItem('vocabulary') as string): []
    const language: LangMode = localStorage.getItem('language')? JSON.parse(localStorage.getItem('language') as string): 'Geo'

  
  
    if(vocabulary.length){
      const done =  (data:{updatedWords: string[], firstWord: Array<string>, title: string})=>{
        store.dispatch(vocabularyActions.addVocabularySuccess(data.updatedWords)) // {type: some_unique_action_name, payload: what you will pass}

        let questIndex = language ===LangMode.GEO? 1: 0
        let answerIndex =  language===LangMode.GEO? 0: 1

        store.dispatch(vocabularyActions.changeWord({ question: data.firstWord[questIndex],  answer: data.firstWord[answerIndex], }))
    
      }
      DataModifier.modifyWords(vocabulary, done)

      DataModifier.splitByStages(vocabulary)
       store.dispatch(vocabularyActions.addVocabularyByStages(vocabulary))
      // store.dispatch(vocabularyActions.addVocabularySuccess(vocabulary))
    }
  }, [])
  
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
    <SignedIn>
    <Welcome/>
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </ClerkProvider>
  );
}
function Welcome() {

  const { getToken } = useAuth();

  useEffect(() => {
    const signInWithClerk = async () => {
       await FireStore.initializeFirebase()
      await FireStore.loginInFirebase(getToken)  
      const localStorageHardWords = localStorage.getItem('hardWords')  ? JSON.parse(localStorage.getItem('hardWords') as string): []
      const databaseHardWords = await FireStore.getUserHardWords() as {hardWords: Array<string>}
      if(databaseHardWords?.hardWords?.length || localStorageHardWords.length){
        
        store.dispatch(vocabularyActions.insertHardWords(databaseHardWords.hardWords || localStorageHardWords))
      }
      
      };
  
      signInWithClerk();
  }, [getToken])


  return  <div className="App">
  <Header/>
  <Switch>
 
  <Route exact  path="/dashboard" >
    <DashboardPage/>
    </Route >
    
  
    <Route exact  path="/about" >
    <AboutPage/>
    </Route>
    <Route exact  path="/hard-words" >
    <HardWordsPage/>
    </Route>
    <Route exact   path="/" >
    <FormPage/>
    </Route>
    
    <Route  ><DashboardPage/></Route>
    {/* <Redirect to={'/'} /> */}
  </Switch>

  
</div>
}
export default App;
