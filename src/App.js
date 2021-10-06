// import React from "react";
// import Users from "./Users";

// function App() {
//   return <Users />;
// }

// export default App;

import React from "react";
import Users from "./Users";
import { UsersProvider } from "./UsersContext";

function App() {
  return (
    <UsersProvider>
      <Users />
    </UsersProvider>
  );
}

export default App;
