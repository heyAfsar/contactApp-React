import React from "react";
import { Route } from "react-router";
import Loadable from "react-loadable";
import Loading from "../ui-molecules/Loading";

const ViewContact = Loadable({
  loader: () => import("../ui-pages/UserHome/components/Content/components/ViewContact"),
  loading: Loading
});

const UserRoutes = () => {
  return (
    <div>
      <Route exact path="/user-home" component={ViewContact} /> 
    </div>
  )
}

export default UserRoutes;
