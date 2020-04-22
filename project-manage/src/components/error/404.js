import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { notFoundStyle } from "../../styles/";
const NotFound = (props) => {
  var history = useHistory();
  const classes = notFoundStyle();
  const handleGoBack = () => {
    history.push("/");
  };
  return (
    <Paper elevation={0} className={classes.root}>
      <Typography noWrap className={classes.code}>
        404
      </Typography>
      <Typography noWrap className={classes.message}>
        It's look like you are lost!
      </Typography>
      <div className={classes.wrapperBtn}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          className={classes.btn}
        >
          Go Back!
        </Button>
      </div>
    </Paper>
  );
};
export default NotFound;
