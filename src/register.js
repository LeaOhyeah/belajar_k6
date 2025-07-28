import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 5,
  duration: "10s",
};

export default function () {
  const uniqueId = new Date().getTime();

  // register
  const registerBody = {
    username: `user-${uniqueId}`,
    password: "rahasia",
    name: "Lea",
  };

  let resRegister = http.post("http://localhost:3000/api/users", JSON.stringify(registerBody), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });


  // login
  const loginBody = {
    username: `user-${uniqueId}`,
    password: "rahasia",
  };

  let resLogin = http.post("http://localhost:3000/api/users/login", JSON.stringify(loginBody), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });

  const jsonLogin = resLogin.json();

  // current user
  let resUser = http.post("http://localhost:3000/api/users/current", {
    headers: {
      Accept: "application/json",
      Authorization: jsonLogin.data.token,
    }
  });

  const jsonUser = resUser.json();
}
