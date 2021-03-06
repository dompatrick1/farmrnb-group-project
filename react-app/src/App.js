import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import UserProfile from "./components/UserProfile/UserProfile";
import Farm from "./components/FarmPage/FarmPage"
import Home from "./components/HomePage/HomePage"
import SearchResults from "./components/SearchResults/SearchResults"
import Footer from "./components/footer/footer"

// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>

        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>

        <Route path="/farm/:id" exact={true}>
          <Farm />
        </Route>

        <ProtectedRoute path="/users" exact={true} >
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path="/user/:userId" exact={true} >
          <UserProfile />
        </ProtectedRoute>

        <Route path="/" exact={true}>
          <Home />
        </Route>

        <Route path="/searchResults" exact={true}>
          <SearchResults />
        </Route>

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
