import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 10, // virtual users
  duration: "5s", // max duration
  summaryTrendStats: ["avg", "min", "med", "max", "p(99)"], // statistik output, p = persentil
};

export default function () {
  let res = http.get("http://localhost:3000/ping");
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1); // sleep before looping
}
