import "./App.css";
import Header from "./components/header/header";
import { Route, Switch } from "react-router-dom";
import FormPage from "./pages/formPage";
import DashboardPage from "./pages/vocabulary-page";

import AboutPage from "./pages/about-page";

import HardWordsPage from "./pages/hard-words-page";
import { useEffect } from "react";
import { vocabularyActions } from "./store/vocabulary-slice";
import store, { RootState } from "./store/reducer";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import { FireStore } from "./firestore/firestore.service";
import { useSelector } from "react-redux";
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  useEffect(() => {
    // Subscribe to Redux state changes
    const unsubscribe = store.subscribe(() => {
      // Update local storage whenever the state changes
      localStorage.setItem("myAppReduxState", JSON.stringify(store.getState()));
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <Welcome />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}
function Welcome() {
  const { getToken } = useAuth();
  const localStorageHardWords = useSelector(
    (state: RootState) => state.vocabulary.hardWords,
  );
  useEffect(() => {
    const signInWithClerk = async () => {
      await FireStore.initializeFirebase();
      await FireStore.loginInFirebase(getToken);
      const databaseHardWords = (await FireStore.getUserHardWords()) as {
        hardWords: Array<string>;
      };
      if (
        databaseHardWords?.hardWords?.length ||
        localStorageHardWords.length
      ) {
        store.dispatch(
          vocabularyActions.insertHardWords(
            databaseHardWords.hardWords || localStorageHardWords,
          ),
        );
      }
    };

    signInWithClerk();
  }, [getToken]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/dashboard">
          <DashboardPage />
        </Route>

        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/hard-words">
          <HardWordsPage />
        </Route>
        <Route exact path="/">
          <FormPage />
        </Route>

        <Route>
          <DashboardPage />
        </Route>
        {/* <Redirect to={'/'} /> */}
      </Switch>
    </div>
  );
}
export default App;
