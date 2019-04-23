import axios from "axios";
import Vue from "vue";

const http = axios.create({
  baseURL: "http://localhost:8079",
  headers: {
    author: "zz"
  }
});

Vue.prototype.$http = http;
