import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import UserRoutes from "../../../../ui-routes/UserRoutes";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { mapDispatchToProps } from "../../../../ui-utils/commons";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // background: "white"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // padding: "0 8px",
    ...theme.mixins.toolbar,
  //  minHeight: "100px"
  },
  content: {
    flexGrow: 1,
    // padding: "8px 8px 8px"
  },
  webHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    flexGrow: 1,
    marginLeft: "16px",
  },
  iconColor: {
    color: "white"
  }
});
class MiniDrawer extends React.Component {
  render() {
    const { classes, history } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          elevation={0}
          // key={index}
          position="fixed"
          className={classNames(classes.appBar)}
        >
          {/* <Toolbar>
            <IconButton
              onClick={(e) => {
                history.goBack();
              }}
              classes={{ root: classes.iconColor }}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              classes={{ root: classes.webHeader }}
            >
            </Typography>
          </Toolbar> */}
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <UserRoutes />
        </main>
      </div>
    );
  }
}
MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { userInfo = {}, selectedLanguage } = preparedFinalObject;
  const { user = {} } = userInfo;
  return { user, selectedLanguage };
};
export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(withTranslation()(MiniDrawer)))
);