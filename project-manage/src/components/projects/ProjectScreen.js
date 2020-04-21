import React, { useState, useEffect } from "react";
import MaterialTable, { MTableEditField } from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Alert } from "../common";
import { projectNameValidation } from "../../constants/hepper";
import {
  CREATE_PROJECT,
  GET_ALL_PROJECTS,
  UPDATE_PROJECT,
  REMOVE_PROJECT,
} from "../../constants/api.js";

const initialState = {
  reload: null,
  actionSuccess: false,
  actionFailed: false,
  invalid: false,
};
const ProjectScreen = (props) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(initialState);
  var history = useHistory();

  const columns = [
    {
      field: "project_name",
      title: "Project Name",
      editComponent: (props) => {
        if (props.value !== undefined && !projectNameValidation(props.value)) {
          return <MTableEditField {...props} error label="invalid" />;
        }
        return <MTableEditField {...props} />;
      },
    },
    {
      field: "description",
      title: "Description",
    },
    {
      field: "assignees",
      title: "Number of Assignees",
      render: (rowData) => {
        var assignees = rowData.assignees;
        return <span>{assignees.length}</span>;
      },
      editable: "never",
    },
  ];

  useEffect(() => {
    if (state.reload !== false) {
      axios({
        method: "get",
        url: GET_ALL_PROJECTS,
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
        .catch((err) => console.log(err));
      return () => {};
    }
  }, [state.reload]);

  const handleAddData = (newData) => {
    const { project_name } = newData;
    return new Promise((resolve, reject) => {
      if (!project_name || !projectNameValidation(project_name)) {
        setState((prevState) => ({
          ...prevState,
          invalid: true,
        }));
        return reject();
      }
      axios({
        method: "post",
        url: CREATE_PROJECT,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: newData,
      })
        .then((data) => {
          console.log(data);
          setState((prevState) => ({
            ...prevState,
            reload: true,
            actionSuccess: true,
          }));
          resolve();
        })
        .catch((err) => {
          console.log(err);
          setState((prevState) => ({
            ...prevState,
            actionFailed: true,
          }));
          reject();
        });
    });
  };
  const handleDelete = (rowData) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "delete",
        url: `${REMOVE_PROJECT}/${rowData._id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
  const handleUpdate = (newData, oldData) => {
    const { project_name } = newData;
    return new Promise((resolve, reject) => {
      if (!project_name || !projectNameValidation(project_name)) {
        setState((prevState) => ({
          ...prevState,
          invalid: true,
        }));
        return reject();
      }
      axios({
        method: "put",
        url: `${UPDATE_PROJECT}/${oldData._id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: newData,
      })
        .then((data) => {
          console.log(data);
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
  const handleCloseInvalid = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((prevState) => ({ ...prevState, invalid: false }));
  };

  const handleView = (event, rowData) => {
    history.push(`/project/${rowData._id}`);
  };

  return (
    <>
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
      <Snackbar
        open={state.invalid}
        autoHideDuration={3000}
        onClose={handleCloseInvalid}
      >
        <Alert severity="error" onClose={handleCloseFail}>
          Input fields value is invalid!
        </Alert>
      </Snackbar>
      <MaterialTable
        title="Projects"
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowAdd: (newData) => handleAddData(newData),
          onRowUpdate: (newData, oldData) => handleUpdate(newData, oldData),
          onRowDelete: (rowData) => handleDelete(rowData),
        }}
        actions={[
          (dataRow) => ({
            icon: "visibility",
            tooltip: `View project ${dataRow.project_name}`,
            onClick: (event, rowData) => handleView(event, rowData),
          }),
        ]}
      />
    </>
  );
};
export default ProjectScreen;
