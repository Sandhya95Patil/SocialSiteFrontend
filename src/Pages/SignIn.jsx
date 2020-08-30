import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import validator from 'validator';
import ErrorIcon from '@material-ui/icons/Error';
import User from "../Service/Service";
import FacebookIcon from '@material-ui/icons/Facebook';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

let service = new User();

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailvalid: '',
            passwordvalid: '',
            userdata: [],
        }
    }
    SnackbarClose = (event) => {
        this.setState({ SnackbarOpen: false });
    }


    onEmailChange = e => {
        if (validator.isEmpty(e.target.value)) {
            this.setState({ emailvalid: "Email Is required" });

        }
        else if (!validator.isEmail(e.target.value)) {
            this.setState({ emailvalid: "Enter valid Email-Id " });
        }
        else {
            this.setState({ emailvalid: '' });
        }

        this.setState({ email: e.target.value });

    };
    onPasswordChange = e => {
        if (validator.isEmpty(e.target.value)) {
            this.setState({ passwordvalid: "Password is Requried" });

        } else {
            this.setState({ passwordvalid: '' });
        }
        this.setState({
            password: e.target.value
        });
    };

    onSubmitData = () => {
        if (validator.isEmpty(this.state.email)) {
            this.setState({ emailvalid: "Email is required" });
        }
        else if (!validator.isEmail(this.state.email)) {
            this.setState({ emailvalid: "Enter valid email-id " });
        }
        else if (validator.isEmpty(this.state.password)) {
            this.setState({ passwordvalid: "Password is required" });
        }
        else {
            const data = {
                Email: this.state.email,
                Password: this.state.password,
            };
            console.log("data", data);
            const url = '';
            service.userLogin(url, data)
            .then((response) =>{
                console.log("user data", response);
                localStorage.setItem("token",response.data.jsonToken);
                localStorage.setItem('profile', response.data.data.profile);
                localStorage.setItem('firstName', response.data.data.firstName);
                localStorage.setItem("lastName", response.data.data.lastName);  
                localStorage.setItem('id', response.data.data.id);
                 this.props.history.push({
                     pathname: "/dashboard",
                      customNameData:response.data.data
                 })
            })
                .catch(
                    err => console.log(err),
                );
        }
    }

    OnAdd = () => {
        this.props.history.push({
            pathname: '/signUp',
        });
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <Div>
                    <align-items>
                    </align-items>
                </Div>
                <Typography component="h1" variant="h5" align="center" style={{ color: 'darkblue' }}>
                    <FacebookIcon style={{ width: '30%', height: '30%' }} />
                </Typography>
                <br></br>
                <br></br>
                <Grid item xs={12}>
                    <TextField
                        onChange={this.onEmailChange}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        defaultValue={this.state.email}
                    />
                    <div>
                        {this.state.emailvalid !== '' ? (<div style={{
                            color: "red",

                            justifyContent: 'flex-start',
                            display: ' flex',
                            paddingBottom: '5%'
                        }}><ErrorIcon /><span style={{ paddingLeft: '10px' }}></span>{this.state.emailvalid}</div>) : (<span style={{ paddingBottom: '3%' }} />)
                        }
                    </div>
                </Grid>
                <br></br>
                <Grid item xs={12}>
                    <TextField
                        onChange={this.onPasswordChange}
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <div>
                        {this.state.passwordvalid !== '' ? (<div style={{
                            color: "red",
                            justifyContent: 'flex-start',
                            display: ' flex',
                            paddingBottom: '5%'
                        }}>
                            <ErrorIcon /><span style={{ paddingLeft: '10px' }}></span>{this.state.passwordvalid}</div>) : (<span style={{ paddingBottom: '3%' }} />)
                        }
                    </div>
                </Grid>

                <br></br>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => this.onSubmitData()}
                >
                    Log In
              </Button>
                <br></br>
                <br></br>
                <Link href="/forgetPassword" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Forgotten account?
                  </Link>
                <br></br>
                <Button style={{ backgroundColor: "green", width: '70%', height: '100%', marginLeft: '15%' }} onClick={() => this.OnAdd()}>Create New Account</Button>
                <Snackbar
                    anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                    open={this.state.SnackbarOpen}
                    autoHideDuration={3000}
                    onClose={this.SnackbarClose}
                    message={<span id="message-id">{this.state.SnackbarMessage}</span>}
                    action={[
                        <IconButton key="close" aria-label="close"
                            color="inherit" onClick={this.SnackbarClose}>x</IconButton>
                    ]}
                />
            </Container>
        );
    }
}
const Div = styled.div`
  margin-top: 20%;
  align-item: center;
`;
