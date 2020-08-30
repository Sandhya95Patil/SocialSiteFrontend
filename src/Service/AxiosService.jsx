import axios from "axios";
const baseUrl="https://localhost:44352/api/";
let token=localStorage.getItem('token');

export default class Axios {
    get(url) {
         return axios.get(baseUrl+url, {
             headers: {
                 "Content-Type": "application/json; charset=utf-8",
                 'Authorization': 'Bearer '+token
             }
         });
     }

     post(url, data) {
        return axios.post(baseUrl+url, data, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer '+token
            }
        });
    }

    PostAdd(url, data){
        return axios.post(baseUrl+url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer '+token
            }
        });
    }
    delete(url){
        return axios.delete(baseUrl+url, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': 'Bearer '+token
            }
        })
    }
    
    }
