import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FacebookIcon from '@material-ui/icons/Facebook';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import User  from '../Service/Service';

let service = new User();

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        let profile=localStorage.getItem('profile');
        this.state = {
            displayProfile:profile,
            userData: [],
            userPost:[],
        }
    }

    componentDidMount() {
        console.log("====================>", this.props.location.customNameData);
        this.setState({ userData: this.props.location.customNameData });

      service.userPost().then((response)=>{
          console.log("user post", response)
      })
    }
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <FacebookIcon style={{ width: '3%', height: '3%' }} />
                        <input type="text" aria-label='search' style={{ width: '50%' }} ></input>
                        <SearchIcon />
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
