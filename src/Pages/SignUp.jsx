import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import User from '../Service/Service';
import validator from 'validator';
import ErrorIcon from '@material-ui/icons/Error';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

let service = new User();

const url = '';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
      dateOfBirth: new Date(),
      firstNamevalid: '',
      lastNamevalid: '',
      emailvalid: '',
      passwordvalid: '',
      gendervalid: '',
      dateofbirthvalid: '',
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSubmitData=this.onSubmitData.bind(this);
  }

  handleChange(date) {
      console.log("date of birth", this.state.dateOfBirth);
    this.setState({ dateOfBirth: date })
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log("Date=====",this.state.dateOfBirth)
  }

  onChangeValue(event) {
    console.log("===================", event.target.value);
    this.setState({gender:event.target.value})
  }

  onFirstNameChange = e => {
    if (validator.isEmpty(e.target.value)) {
      this.setState({ firstNamevalid: "First Name Is Requried" });

    } else {
      this.setState({ firstNamevalid: '' });
    }
    this.setState({
      firstName: e.target.value
    });
  };

  onLastNameChange = e => {
    if (validator.isEmpty(e.target.value)) {
      this.setState({ lastNamevalid: "Last Name Is Requried" });
    } else {
      this.setState({ lastNamevalid: '' });
    }
    this.setState({
      lastName: e.target.value
    });
  };
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
      this.setState({ passwordvalid: "Password Is required" });
    }
    else {
      this.setState({ password: e.target.value });
    }
  }

  onSubmitData (){
    if (validator.isEmpty(this.state.firstName)) {
      this.setState({ firstNamevalid: "First name is required" });
    }
    else if (validator.isEmpty(this.state.lastName)) {
      this.setState({ lastNamevalid: "Last name is required" });
    }
    else if (validator.isEmpty(this.state.email)) {
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
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        Email: this.state.email,
        Password: this.state.password,
        DateOfBirth: this.state.dateOfBirth,
        Gender: this.state.gender,
      };
      console.log("data", data);
      service.userRegister(url, data).then(
        res => console.log(res),
        alert("Registration Successful..!"),
        this.props.history.push({
          pathname: "/"
        })
      )
        .catch(
          err => console.log(err),
        );
    }
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Div>
          <align-items></align-items>
        </Div>
        <Typography component="h1" variant="h5" style={{ color: 'black', fontWeight: 'bold' }}>
          Sign up
        </Typography>
        <div>It's quick and easy</div>
        <br></br>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField

                onChange={this.onFirstNameChange}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                defaultValue={this.state.firstName}
              />
              <div>
                {this.state.firstNamevalid !== '' ? (<div style={{
                  color: "red",
                  justifyContent: 'flex-start',
                  display: 'flex',
                  paddingBottom: '5%',
                  paddingTop: '5%'
                }}><ErrorIcon /><span style={{ marginLeft: '10px' }}></span>{this.state.firstNamevalid}</div>) : (<span style={{ paddingBottom: '3%' }} />)
                }
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onChange={this.onLastNameChange}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                defaultValue={this.state.lastName}
              />
              <div>
                {this.state.lastNamevalid !== '' ? (<div style={{
                  color: "red",
                  justifyContent: 'flex-start',
                  display: ' flex',
                  paddingBottom: '5%',
                  paddingTop: '5px'
                }}><ErrorIcon /><span style={{ marginLeft: '10px' }}></span>{this.state.lastNamevalid}</div>) : (<span style={{ paddingBottom: '3%' }} />)
                }

              </div>
            </Grid>
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
                  paddingBottom: '5%',
                  paddingTop: '5%'
                }}><ErrorIcon /><span style={{ marginLeft: '10px' }}></span>{this.state.emailvalid}</div>) : (<span style={{ paddingBottom: '3%' }} />)
                }
              </div>
            </Grid>
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
                  display: 'flex',
                  paddingBottom: '5%',
                  paddingTop: '5px'
                }}><ErrorIcon /><span style={{ marginLeft: '10px' }}></span>{this.state.passwordvalid}</div>) : (<span style={{ paddingBottom: '3%' }} />)
                }
              </div>
            </Grid>
          </Grid>
          <br></br>
          {/* <form onSubmit={ this.onFormSubmit }> */}
        <div className="form-group">
          <DatePicker
              selected={ this.state.dateOfBirth }
              onChange={ this.handleChange }
              name="startDate"
              dateFormat="MM/dd/yyyy"
          />
          {/* <button className="btn btn-primary">Show Date</button> */}
        </div>
      {/* </form> */}

          <div onChange={this.onChangeValue}>
            <input type="radio" value="Male" name="gender" /> Male
            <span style={{marginLeft:'22%'}}></span>
            <input type="radio" value="Female" name="gender" /> Female
            <span style={{marginLeft:'22%'}}></span>
            <input type="radio" value="Other" name="gender" /> Other
      </div>
      <br></br>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.onSubmitData}
          >
            Sign Up
          </Button>
          <br></br>
      </Container>
    );
  }
}

const Div = styled.div`
  margin-top: 20%;
  align-item: center;
`;
