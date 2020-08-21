import Axios from "./AxiosService";

const axiosService = new Axios();

export default class Service {
    userLogin(url, data) {
        return axiosService.post("Account/Login", data);
    }
    userRegister(url, data) {
        return axiosService.post("Account/SignUp", data);
    }

    userProfile(url, data) {
        return axiosService.post("Account/Profile", data);
    }

    userPost(url) {
        return axiosService.get("Post");
    }
}


