import "App.css";
import Administrador from "pages/Administrador";
import Cliente from "pages/Cliente";
import React, { useState } from "react";

function App() {
  const [session, setSession] = useState(false);

  const userJson = window.localStorage.getItem("loggedUser");

  let user = {};
  if (userJson) {
    user = JSON.parse(userJson);
  }

  const admin = user.tipo_C == "Administrador" ? true : false;

  return (
    <div className={`${admin ? "App_Admin" : "App_Cliente"}`}>
      {admin ? (
        <Administrador session={session} setSession={setSession} />
      ) : (
        <Cliente session={session} setSession={setSession} /> //session={session} setSession={setSession}
      )}
    </div>
  );
}

export default App;
