import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import User from "../Service/Service";
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

let service=new User();

export default class Dashboard extends React.Component {
constructor(props){
    super(props);
        this.state={
            requests:[],
            allUsers:[],
            count:0
        }
}
    componentDidMount(){
       service.userFriendsRequests().then((response)=>{
           console.log("Friends", response.data.data);
           this.setState({requests:response.data.data});
           this.setState({count:response.data.count})
       });

       service.allUsers().then((userResponse)=>{
           console.log("All users", userResponse);
           this.setState({allUsers:userResponse.data.data})
       })
        
    }

    onAcceptRequest=(friendId, requestId)=>{
        service.acceptRequest(friendId, requestId).then((response)=>{
            console.log('Response of accept request', response);
        })
    }

    onRejectRequest=(userId, requestId)=>{
        console.log('user id', userId);
        console.log('request id', requestId);
        service.deleteRequest(userId, requestId).then((rejectResponse)=>{
            console.log("request reject response", rejectResponse);
        }).catch((err)=>{
            console.log('error', err);
        })
    }

    onAddFriend=(userId)=>{
       service.addFriend(userId).then((addResponse)=>{
           console.log("Add Friend response", addResponse);
       })
    }
    render(){
        return(
            <div>
                 <div style={{fontSize:'110%', fontFamily:'bold', marginLeft:'25%', marginTop:'3%'}}>Respond to Your {this.state.count} Friend Requests</div>
                 <Divider/>
                {this.state.requests.map((friend)=>(
                    <div style={{display:'flex', flexDirection:'row', marginLeft:'25%', marginTop:'3%'}}>
                        <Avatar src= {friend.profile} width="20%" height="30%"/>
                        <span style={{marginTop:'3%'}}></span>
                        {friend.firstName} {friend.lastName}
                        <Button variant="contained" color="primary" style={{marginLeft:'25%' }} onClick={()=>this.onAcceptRequest(friend.userId, friend.requestId)}>Confirm</Button>
                <Button variant="contained" style={{marginLeft:'20%'}} onClick={()=>this.onRejectRequest(friend.userId, friend.requestId)}>Delete Request</Button>
                    </div>
                ))}
                <Divider />
                <div style={{fontSize:'110%', fontFamily:'bold', marginLeft:'25%', marginTop:'1%'}}>People You May Know</div>
                <Divider />
               {this.state.allUsers.map((user)=>(
                  <div style={{display:'flex', flexDirection:'row', marginLeft:'25%', marginTop:'3%'}}>
                  <Avatar src= {user.profile} width="20%" height="30%"/>
                  <span style={{marginTop:'3%'}}></span>
                  {user.firstName} {user.lastName}
                  <Button variant="contained" color="primary" style={{marginLeft:'25%' }} onClick={()=>this.onAddFriend(user.id)}>Add Friend</Button>
                  <Button variant="contained" style={{marginLeft:'20%'}}>Remove</Button>
              </div>
               ))}
            </div>
        )
    }
}
