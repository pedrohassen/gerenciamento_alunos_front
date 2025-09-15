import axios from "../api/axios";
import Cookies from "js-cookie";

export async function login(email: string, password: string) {
  const response = await axios.post("/Usuario/login", { email, password });

  Cookies.set("token", response.data.token, { expires: 1 });

  return response.data;
}

export function logout() {
  Cookies.remove("token");
}

export function getToken() {
  return Cookies.get("token");
}
