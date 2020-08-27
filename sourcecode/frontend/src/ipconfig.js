export const wsuri = "ws://52.79.86.10:8964";

export const hostIP = 'http://localhost:6464';

const apiURL = "/api";
const userURL = "/user";
const endPoint = `${hostIP}${apiURL}`;
const userEndPoint = `${endPoint}${userURL}`

export const user_register_url = `${userEndPoint}/register`;
export const user_login_url = `${userEndPoint}/login`;
export const user_detail_rul = id => `${userEndPoint}/${id}`;


