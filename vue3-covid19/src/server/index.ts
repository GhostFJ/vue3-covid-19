/*
 * @Author: FunJust
 * @Date: 2022-04-26 21:53:58
 * @Description: 
 */
import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:8888"
})

export const fetchData = () => {
  return server.get('/api/list').then(res => res.data.data)
}