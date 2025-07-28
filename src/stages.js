import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 20 }, // 1-10s, 0-20 vus (bertahap, bukan langsung 20)
    { duration: "10s", target: 10 }, // 11-20s. 20-10 vus
    { duration: "10s", target: 0 }, // 21-30s. 10-0 vus
  ],

  // vus: 10, // virtual users
  // duration: "5s", // max duration
  summaryTrendStats: ["avg", "min", "med", "max", "p(99)"], // statistik output, p = persentil
};

export default function () {
  let res = http.get("http://localhost:3000/ping");
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1); // sleep before looping
}
