import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../../trainRedux/action/auth";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.userLoginFetch(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p className={classes.error}>{this.props.error}</p>;
    }

    let authRedirect = null;
    if (this.props.isLogin) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <main className="page contact-us-page">
        <section className="clean-block clean-form dark">
          <div className="container">
            <div className="block-heading" style={{ paddingTop: "30px" }}>
              <h2 className="text-info">Đăng nhập</h2>
            </div>
            <div>
              {authRedirect}
              {errorMessage}
              <form
                onSubmit={this.submitHandler}
                style={{ paddingBottom: "60px" }}
              >
                {form}
                <Button btnType="Success">Sign In</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    authRedirectPath: state.authReducer.authRedirectPath,
    isLogin: state.authReducer.isLogin !== false,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  userLoginFetch: (email, password) =>
    dispatch(actions.userLoginFetch(email, password)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
