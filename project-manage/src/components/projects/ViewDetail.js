import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router-dom";
import { viewDetailStyle } from "../../styles/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import { Alert } from "../common";
import {
  GET_PROJECT,
  ASSIGN,
  REMOVE_MEMBER_FROM_PROJECT,
  GET_AVAILABLE_MEMBERS,
} from "../../constants/api.js";

const initialState = {
  reload: null,
  actionSuccess: false,
  actionFailed: false,
  invalid: false,
};
const ViewDetail = (props) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(initialState);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [membersToAssign, setMembersToAssign] = useState([]);

  var history = useHistory();
  const { id } = useParams();
  const classes = viewDetailStyle();
  const columns = [
    {
      field: "full_name",
      title: "Fullname",
    },
    {
      field: "phone_number",
      title: "Phone Number",
      editable: "never",
    },
    {
      field: "birthday",
      title: "Birthday",
      render: (rowData) => {
        if (rowData) {
          var date = new Date(rowData.birthday);
          return <span>{date.toLocaleDateString()}</span>;
        }
        return null;
      },
      editable: "never",
    },
  ];

  useEffect(() => {
    if (state.reload !== false) {
      axios({
        method: "get",
        url: `${GET_PROJECT}/${id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          var { data } = response;
          setData(data);
          setState((prevState) => ({ ...prevState, reload: false }));
        })
        .catch((err) => history.push("/not-found"));
      return () => {};
    }
  }, [state.reload]);

  useEffect(() => {
    if (state.reload !== false) {
      axios({
        method: "get",
        url: `${GET_AVAILABLE_MEMBERS}/${id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          var { data } = response;
          setAvailableMembers(data);
        })
        .catch((err) => history.push("/not-found"));
      return () => {};
    }
  }, [data.assignees]);

  const handleBack = () => {
    history.push("/project");
  };

  const handleAssign = () => {
    var newData = membersToAssign.map((item) => item._id);
    axios
      .all(
        newData.map((memberId) =>
          axios({
            method: "put",
            url: `${ASSIGN}/${id}`,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            data: { assignee: memberId },
          })
        )
      )
      .then(
        axios.spread(function (added) {
          setState((prevState) => ({
            ...prevState,
            reload: true,
            actionSuccess: true,
          }));
          setMembersToAssign([]);
        })
      )
      .catch((err) => {
        setState((prevState) => ({
          ...prevState,
          actionFailed: true,
        }));
      });
  };
  const handleDelete = (rowData) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "put",
        url: `${REMOVE_MEMBER_FROM_PROJECT}/${id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: { assignee: rowData._id },
      })
        .then((data) => {
          setState((prevState) => ({
            ...prevState,
            reload: true,
            actionSuccess: true,
          }));
          resolve();
        })
        .catch((err) => {
          setState((prevState) => ({
            ...prevState,
            actionFailed: true,
          }));
          reject();
        });
    });
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((prevState) => ({ ...prevState, actionSuccess: false }));
  };

  const handleCloseFail = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((prevState) => ({ ...prevState, actionFailed: false }));
  };

  const handleSelected = (event, value) => {
    setMembersToAssign(value);
  };

  const { project_name, description, assignees, _id } = data;
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleBack}
          >
            <span className="material-icons">arrow_back</span>
          </IconButton>
        </Grid>
        <Grid className={classes.header} item xs={11}>
          <Typography className={classes.projectName} noWrap>
            {project_name}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                {project_name}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                ID: {_id}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Description:
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {description}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Number of members: {assignees && assignees.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={9}>
          <div style={{ width: "100%" }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={availableMembers}
              getOptionLabel={(option) => option.full_name}
              filterSelectedOptions
              value={membersToAssign}
              onChange={(event, value) => handleSelected(event, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Choose Members"
                  placeholder="Choose Members"
                  margin="normal"
                  fullWidth
                />
              )}
            />
          </div>
        </Grid>
        <Grid xs={3} className={classes.btnWrapper}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAssign}
            className={classes.btn}
          >
            Assign
          </Button>
        </Grid>
        <Grid xs={12}>
          <Snackbar
            open={state.actionSuccess}
            autoHideDuration={3000}
            onClose={handleCloseSuccess}
          >
            <Alert severity="success" onClose={handleCloseSuccess}>
              Action succesful!
            </Alert>
          </Snackbar>
          <Snackbar
            open={state.actionFailed}
            autoHideDuration={3000}
            onClose={handleCloseFail}
          >
            <Alert severity="error" onClose={handleCloseFail}>
              Action failed!
            </Alert>
          </Snackbar>
          <MaterialTable
            title="Members in project"
            columns={columns}
            data={assignees}
            options={{
              actionsColumnIndex: -1,
            }}
            editable={{
              onRowDelete: (rowData) => handleDelete(rowData),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default ViewDetail;
