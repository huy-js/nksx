import React, { Component } from "react";
import { userLoginFetch } from "../../trainRedux/action/actionAuth";
import { connect } from "react-redux";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "./Auth.module.css";

class LoginCopy extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     password: "",
  //     isLogin: false,
  //   };
  // }

  // HUY

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
    isLogin: false,
  };

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

  // PHAT

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let result = await this.props.userLoginFetch(this.state);
    if (!result) {
      alert("sai thông tin đăng nhập rồi");
    }
    return window.location.reload();
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
    return (
      <main className="page contact-us-page">
        <section className="clean-block clean-form dark">
          <div className="container">
            <div className="block-heading" style={{ paddingTop: "30px" }}>
              <h2 className="text-info">Đăng nhập</h2>
            </div>
            <div >
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
      // <main className="page contact-us-page">
      //   <section className="clean-block clean-form dark">
      //     <div className="container">
      //       <div className="block-heading" style={{ paddingTop: "30px" }}>
      //         <h2 className="text-info">Đăng nhập</h2>
      //       </div>
      //       <form
      //         onSubmit={this.handleSubmit}
      //         style={{ paddingBottom: "60px" }}
      //       >
      //         <div className="form-group">
      //           <label>Email</label>
      //           <input
      //             className="form-control"
      //             type="email"
      //             name="email"
      //             value={this.state.email}
      //             onChange={this.handleChange}
      //           />
      //         </div>
      //         <div className="form-group">
      //           <label>Password</label>
      //           <input
      //             type="password"
      //             name="password"
      //             className="form-control "
      //             value={this.state.password}
      //             onChange={this.handleChange}
      //           />
      //         </div>

      //         <div className="form-group">
      //           <button className="btn btn-primary btn-block" type="submit">
      //             Send
      //           </button>
      //         </div>
      //       </form>
      //     </div>
      //   </section>
      // </main>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  userLoginFetch: (email, password) =>
    dispatch(userLoginFetch(email, password)),
});

export default connect(null, mapDispatchToProps)(LoginCopy);
