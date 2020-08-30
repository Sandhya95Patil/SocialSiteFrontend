import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import User from "../Service/Service";
import { Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
//import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import "./UserProfile"

let service = new User();
let profile = localStorage.getItem('profile');
let firstName=localStorage.getItem('firstName');
let lastName=localStorage.getItem('lastName');

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPost: [],
      userData: [],
      likes:[],
      comment:'',
    }
  }
  componentDidMount() {
    service.userPosts().then((response) => {
      console.log("user post", response);
      this.setState({ userPost: response.data.data });

    })
  }

  onCommentChange=(e)=>{
    this.setState({comment:e.target.value});
  }

  addLike=(postId)=>{
    service.addLike(postId).then((response)=>{
      console.log("like post", response);
    })
  }

  addComment=(postId)=>{
    const data={
      Comment:this.state.comment
    };
    console.log("data", data);
    service.addComment(postId, data).then((response)=>{
      console.log("Add Comment", response);
    })
  }

  render() {
   // let btn_class=this.state.gray ? "grayButton" : "whiteButton";
    return (

        <div style={{ marginTop: '5%' }}>
          {this.state.userPost.map((post) => (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems:'center', marginLeft:'-18%'}}> 
              <Avatar src={profile}> </Avatar>{firstName} {lastName}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '40%' }}>{post.text}</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={post.imageUrl} width="20%" height="30%" alt='' />
              </div>
              <Link style={{ display: 'flex', flexDirection: 'column', marginLeft: '40%' }}>{post.siteUrl}</Link>
              <Divider/>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button style={{marginLeft:'40%'}} onClick={()=>this.addLike(post.id)}><ThumbUpIcon /> Like</Button>
                <Button style={{marginLeft:'8%'}} onClick={()=>this.addComment(post.id)}><ChatBubbleOutlineIcon /> Comment</Button>
                </div>
          
              <Divider/>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <Avatar src={profile}></Avatar>
              <TextField label='Write a comment' variant="outlined" onChange={this.onCommentChange}></TextField>
             </div>
            </div>
          ))}
        </div>

    )
  }
}


