import ax from "axios";

const axios = ax.create({
  baseURL: "http://10.0.2.2:8080/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axios;
