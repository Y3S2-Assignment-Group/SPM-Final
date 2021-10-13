import React, { Component } from 'react';
import './AdminRegistrationPage.css'
import { connect } from "react-redux";
import * as actions from "../../../store/actions/authActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input } from "reactstrap";

class AdminRegistrationPage extends Component {
    constructor(props) {
        super(props);
        this.onRegistration = this.onRegistration.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobileNumber: ""
        };
    }

    onValueChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onRegistration(e) {
        e.preventDefault();

        if(this.state.password === this.state.confirmPassword){
            const registrationObj = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                username: this.state.username,
                mobileNumber: this.state.mobileNumber
            };

            console.log(registrationObj)
            this.props.adminRegister(
                registrationObj,
                () => {
                    toast.success('Registration Success', {
                        autoClose: false,
                    });
                    window.location = "/admindashboard";
                },
                () => {
                    toast.error('Username or password incorrect. Please try again', {
                        autoClose: false,
                    });
                }
            );
        }else{
            toast.error('Password mismatch', {
                autoClose: false,
            });
        }

    }

    render() {
        return (
            <div>
                <div className="RegistrationPageCard">
                    <div className="row RegistrationPageRow">
                        <div className="col-md-4 RegistrationPageColOne p-5">

                            <div className="container text-center">
                                <div className="container mb-3">
                                    <h5>REGISTER HERE!</h5>
                                </div>
                                <div className="container mt-5">
                                    <Form onSubmit={this.onRegistration}>
                                        <FormGroup className="mt-2">
                                            <Input type="text" name="name" id="name" placeholder="Name" onChange={(e) => {
                                                this.onValueChange(e);
                                            }} />
                                        </FormGroup>
                                        <FormGroup className="mt-2">
                                            <Input type="text" name="username" id="username" placeholder="Username" onChange={(e) => {
                                                this.onValueChange(e);
                                            }} />
                                        </FormGroup>
                                        <FormGroup className="mt-2">
                                            <Input type="email" name="email" id="email" placeholder="Email" onChange={(e) => {
                                                this.onValueChange(e);
                                            }} />
                                        </FormGroup>
                                        <FormGroup className="mt-2">
                                            <Input type="password" name="password" id="password" placeholder="Password" onChange={(e) => {
                                                this.onValueChange(e);
                                            }} />
                                        </FormGroup>
                                        <FormGroup className="mt-2">
                                            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" onChange={(e) => {
                                                this.onValueChange(e);
                                            }} />
                                        </FormGroup>
                                        <FormGroup className="mt-2">
                                            <Input type="text" name="mobileNumber" id="mobileNumber" placeholder="Mobile Number" onChange={(e) => {
                                                this.onValueChange(e);
                                            }} />
                                        </FormGroup>

                                        <FormGroup className="mt-5">
                                            <Button className="mt-2 loginBtn">
                                                Register
                                            </Button>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </div>
                            <ToastContainer />
                        </div>
                        <div className="col-md-4 RegistrationPageColTwo p-5">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapActionToProps = {
    adminRegister: actions.adminRegister
};
  
export default connect(null, mapActionToProps)(AdminRegistrationPage);