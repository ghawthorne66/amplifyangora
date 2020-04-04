import React from "react";
import "./App.css";
import { Auth, Hub } from "aws-amplify";
import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MarketPage from "./pages/MarketPage";
import Navbar from "./components/Navbar";

export const UserContext = React.createContext();

class App extends React.Component {
  state = {
    user: null
  };
  componentDidMount() {
    console.dir(AmplifyTheme);
    this.getUserData();
    Hub.listen("auth", this, "onHubCapsule");
  }
  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user ? this.setState({ user }) : this.setState({ user: null });
  };

  onHubCapsule = capsule => {
    switch (capsule.payload.event) {
      case "signin":
        console.log("signed in");
        this.getUserData();
        break;
      case "signup":
        console.log("signed up");
        break;
      case "signout":
        console.log("signed out");
        this.setState({ user: null });
        break;
      default:
        return;
    }
  };

  handleSignout = async () => {
    try {
      await Auth.signOut();
      console.log("logging out");
    } catch (err) {
      console.error("Error signing out user", err);
    }
  };

  render() {
    const { user } = this.state;
    return !user ? (
      <Authenticator theme={theme} />
    ) : (
      <UserContext.Provider value={{ user }}>
        <Router>
          <>
            <Navbar user={user} handleSignout={this.handleSignout} />

            <div className="app-container">
              <Route exact path="/" component={Homepage} />
              <Route path="/profile" component={ProfilePage} />
              <Route
                path="/markets/:marketId"
                component={({ match }) => (
                  <MarketPage marketId={match.params.marketId} />
                )}
              />
            </div>
          </>
        </Router>
      </UserContext.Provider>
    );
  }
}
const theme = {
  ...AmplifyTheme,
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "var(--squidInk)",
    color: "white"
  },
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--squidInk)",
    color: "white"
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px",
    BackgroundColor: "var(--squidInk)"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  }
};
// export default withAuthenticator(App, true, [], null, theme);
export default App;
