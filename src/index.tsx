/**
 * Entry point for the PDS Web App
 * @module
 */
import "./index.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Redirect } from 'react-router';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

import { Root } from "src/components/Root";

const location = window.location;
const protocol = location.protocol;
const host = location.hostname;

const env = host === "localhost" ? `dev` : `api`;

// todo: add dynamic env var when there is a production and development
export const api = axios.create({
    baseURL: `http://dev-tracker.thomaskbird.com/api`
});

if (localStorage.getItem("token")) {
  api.defaults.headers.common[
    "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
}

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (401 === error.response.status) {
    // @ts-ignore
    window.location = '/';
  } else {
    return Promise.reject(error);
  }
});

/**
 * Web App root path.
 * If available, the web app exists in a sub directory on the server.
 */
const webAppRootPath =
    process.env.WEB_APP_ROOT_PATH != null
        ? `/${process.env.WEB_APP_ROOT_PATH}`
        : "";

/**
 * Creates the Root component
 * @returns Root component
 */
function createAppElement(): JSX.Element {
  return (
    <BrowserRouter basename={webAppRootPath}>
      <Root />
    </BrowserRouter>
  );
}

ReactDOM.render(createAppElement(), document.getElementById("root"));
