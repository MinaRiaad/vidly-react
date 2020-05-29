import React  from "react";
import joi from "joi-browser";
import auth from '../services/authService'
import Form from './form'
import { Redirect } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
}

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: joi
      .string()
      .required()
      .label("Username"),
    password: joi
      .string()
      .required()
      .label("Password")
  };

  componentClicked=()=>{
    console.log('clicked')
  };

  responseFacebook=async (response)=>{
    if(response.accessToken){
      await auth.loginWithFacebook(response.id,response.name,response.email);
      const{state}=this.props.location;
      console.log(response);
      window.location=state?state.from.pathname:'/';
    }
  }

  responseGoogle=async(response)=>{
    console.log(response);
  }



  doSubmit=async ()=>{
    try {
      const { data } = this.state;
      await auth.login(data.username,data.password);
      const{state}=this.props.location;
      window.location=state?state.from.pathname:'/';
    } catch (ex) {
      if(ex.response&&ex.response.status===400){
        const errors={...this.state.errors};
        errors.username=ex.response.data;
        this.setState({errors});
      }
    }
  }

  render() {
    if(auth.getCurrentUser())return <Redirect to="/"/>
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          {this.renderInput("username","Username","text")}
          {this.renderInput("password","Password","password")}
          {this.renderButton('Login')}
          <hr/>
          <FacebookLogin
            appId="254062636002623"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
