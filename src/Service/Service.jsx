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

    userPosts(url) {
        return axiosService.get("Post");
    }

    userFriendsRequests(url){
        return axiosService.get("Account/Friends/Requests");
    }

    getAllLikes(id){
      return axiosService.get(`Post/${id}/Likes`);
    }

    addLike(postId){
      return axiosService.post(`Post/${postId}/LikeDisLike`)
    }

    addComment(postId, data){
        return axiosService.post(`Post/${postId}/Comment`, data);
    }

    acceptRequest(userId, resquestId){
        return axiosService.post(`Account/${userId}/FriendRequest/${resquestId}/Accept`);
    }

    deleteRequest(userId, requestId){
        return axiosService.post(`Account/${userId}/FriendRequest/${requestId}/Reject`);
    }

    allUsers(){
        return axiosService.get(`Account`);
    }

    addFriend(userId){
        return axiosService.post(`Account/${userId}/Friend`);
    }

    allPosts(){
        return axiosService.get(`Post/Friends`);
    }

    getAllComments(postId){
        return axiosService.get(`Post/${postId}/Comments`);
    }

    addPost(file, text, siteUrl){
        return axiosService.post(`Post`, file, text, siteUrl);
    }
}


