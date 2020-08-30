import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FacebookIcon from '@material-ui/icons/Facebook';
import SearchIcon from '@material-ui/icons/Search';
import User from '../Service/Service';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Modal from 'react-awesome-modal';
import './Dash.scss'

let service = new User();
let profile = localStorage.getItem('profile');
let firstName = localStorage.getItem('firstName');
let id=localStorage.getItem('id');

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            friendPosts: [],
            allcomments: [],
            comment: '',
            visible: false,
            firstName: 'Whats on your mind,' + firstName + '?',
            profilePic: null,
            text: '',
            siteurl: '',
            color:'red'
        }
        this.onProfileClick = this.onProfileClick.bind(this);
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    componentDidMount() {
        console.log("data from sign in", this.props.location.customNameData);
        this.setState({ userData: this.props.location.customNameData });

        service.allPosts().then((response) => {
            console.log('item 1', response.data.item1);
            console.log("item 2", response.data.item2);
            console.log('item 3', response.data.item3);
            this.setState({ friendPosts: response.data.item1 });
            this.setState({ allcomments: response.data.item2 });
        })
    }

    onProfileClick() {
        this.props.history.push({
            pathname: '/userProfile',
        })
    }

    onFriends = () => {
        this.props.history.push({
            pathname: '/findFriends',
        })
    }

    onCommentChange = (e) => {
        this.setState({ comment: e.target.value });
    }

    addLike = (postId) => {
        service.addLike(postId).then((response) => {
            console.log("like post", response);
           this.setState({color:'green'})
        })
    }

    addComment = (postId) => {
        const data = {
            Comment: this.state.comment
        };
        console.log("data", data);
        service.addComment(postId, data).then((response) => {
            console.log("Add Comment", response);
        })
    }

    onTextChange = (event) => {
        this.setState({ text: event.target.value });
        console.log("========>", this.state.text);
    }

    onSiteUrlChange = (event) => {
        this.setState({ siteurl: event.target.value });
        console.log("site url", this.state.siteurl);
    }

    onHandleUploadImage = (event) => {
        this.setState({ profilePic: event.target.files[0] })
        console.log("file", this.state.profilePic);
    }

    onAddPost=async()=>{
        let fileData=new FormData();
        let text=this.state.text;
        let siteUrl=this.state.siteurl;
        console.log("filedata", fileData);
        console.log("text======>", text);
        fileData.append('file', this.state.profilePic);
        await service.addPost(fileData, text, siteUrl).then((response)=>{
            console.log("add post", response);
        })
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <FacebookIcon style={{ width: '3%', height: '3%' }} />
                        <input type="text" aria-label='Search people here' style={{ width: '50%' }} ></input>
                        <SearchIcon />
                        <Button onClick={this.onProfileClick} style={{ width: '10%', height: '10%' }}>
                            <Avatar alt="Remy Sharp" src={this.state.userData.profile} style={{ width: '20%', height: '20%' }} />
                            {this.state.userData.firstName}
                        </Button>
                        <Button>Home</Button>
                        <Button onClick={this.onFriends}>Find Friends</Button>
                        <Button>Create</Button>
                    </Toolbar>
                </AppBar>
                <Divider />
                <div style={{ display: 'flex', marginLeft: '40%' }}>Create Po   st</div>
                <Divider />
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '40%' }}>
                    <Avatar src={profile}></Avatar><Button onClick={() => this.openModal()}>Whats on your mind, {firstName}?</Button>
                    <Modal visible={this.state.visible} width="400" height="300" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                        <div>
                            <div style={{ fontSize: '20px' }}>Create Post</div>
                            <Divider />
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Avatar src={profile}></Avatar>
                                <span style={{ marginLeft: '3%' }}></span>
                                <TextField type="text" placeholder={this.state.firstName} style={{ height: '100%', width: '100%' }} onChange={this.onTextChange}></TextField>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '5%' }}>
                                <input
                                    id='addimage00'
                                    type='file' aria-label="Image"
                                    style={{ display: 'none' }}
                                    onChange={(event) => this.onHandleUploadImage(event)}
                                />
                                <label htmlFor='addimage00'
                                    style={{
                                        display: 'inline-block',
                                        width: '36%',
                                        background: 'linear-gradient(top, #f9f9f9, #e3e3e3)',
                                        border: '1px solid #999',
                                        padding: '5px 8px',
                                        outline: 'none',
                                        whiteSpace: 'nowrap',
                                        cursor: 'pointer',
                                        textShadow: '1px 1px #fff',
                                        fontWeight: '700',
                                        fontSize: '10pt',
                                        marginLeft: "29%",
                                        marginBottom: '10%'
                                    }}>
                                    Select a photo
                           </label>
                            </div>
                            <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20%' }} onClick={this.onAddPost}>Post</Button>
                        </div>
                    </Modal>
                </div>

                <div>
                    {this.state.friendPosts.map((post) => (
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3%', marginLeft: '40%' }}>
                                <Avatar src={post.profile}></Avatar>
                                <div>{post.firstName} {post.lastName}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ marginRight: '18%' }}>{post.text}</div>
                                <img src={post.imageUrl} width="20%" height="30%" alt='' />
                                <Link style={{ marginRight: '15%' }}>{post.siteUrl}</Link>
                            </div>
                            <Button className={post.like === true ? 'background-blue' : 'background-black'} style={{ marginLeft: '40%'}} onClick={() => this.addLike(post.postId)} ><ThumbUpIcon/>Like</Button>
                            <Button style={{ marginLeft: '8%' }} onClick={() => this.addComment(post.postId)}><ChatBubbleOutlineIcon /> Comment</Button>
                            <Divider />
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Avatar src={profile}></Avatar>
                                <TextField label='Write a comment' variant="outlined" onChange={this.onCommentChange}></TextField>
                                <br></br>
                                <div style={{ display: 'flex', flexDirection: 'column'}}>
                                {this.state.allcomments.map((commentOf) => (
                                    <div style={{ whiteSpace: 'pre-line' }}>
                                        {commentOf.commentById === post.userId ? <Avatar src={post.profile}></Avatar> : null}
                                        {commentOf.commentById === id ? <Avatar src={profile}></Avatar> : null}
                                        {commentOf.postId === post.postId ? commentOf.comment : null}
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}
