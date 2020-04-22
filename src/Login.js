import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import fire from "./config";

import { render } from "react-dom";
import {useHistory} from 'react-router-dom';
// import Button from "material-ui/Button";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { CardHeader, CardContent, CardActions } from "@material-ui/core";

import ResponsiveCard from "./ResponsiveCard.js";
import ResponsiveContainerGrid from "./ResponsiveContainerGrid.js";

export const Login = ({saveUser}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(() => email);
  }
  const handleChangePassword = (e) => {
    const password = e.target.value;
    setPassword(() => password);
  }

  const login = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        saveUser(user);
        history.push("/home");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const signup = (e) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  }

    return (
      <div>
        {/* <ResponsiveContainerGrid> */}
        <Grid item xs={12} sm={6}>
          {/* <ResponsiveCard> */}
          <form>
            <CardHeader
              title="Sign in"
              subheader="to the system
                "
            />

            <CardContent>
              <TextField
                value={email}
                onChange={handleChangeEmail}
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              {/* <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small> */}

              <TextField
                value={password}
                onChange={handleChangePassword}
                type="password"
                name="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </CardContent>
            <CardActions style={{ justifyContent: "space-between" }}>
              <Button
                type="submit"
                style={{ marginLeft: "25px" }}
                onClick={login}
                class="btn btn-primary"
              >
                Login
              </Button>
              <Button
                onClick={signup}
                style={{ marginLeft: "25px" }}
                className="btn btn-success"
              >
                Signup
              </Button>
            </CardActions>
          </form>
          {/* </ResponsiveCard> */}
        </Grid>
        {/* </ResponsiveContainerGrid> */}
        {/* <h3>{error}</h3> */}
      </div>
    );
  
}
