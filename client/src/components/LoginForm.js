import React, { useState, useEffect } from "react";
import {useApolloClient, useMutation} from "@apollo/client";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../graphql/mutations";

// eslint-disable-next-line react/prop-types
const LoginForm = ({ setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
      setTimeout(function () {
        setError(null);
      }, 3000);
    },
  });

  const client = useApolloClient();

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      localStorage.setItem("user-token", token);
      history.push("/challenges");
      client.resetStore();
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();
    await login({ variables: { username, password } });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
