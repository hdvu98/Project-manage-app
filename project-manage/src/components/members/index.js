import React, { useState, useEffect } from "react";
import moment from "moment";
import MaterialTable, { MTableEditField } from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "../common";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import axios from "axios";

import {
  dateValidation,
  fullNameValidation,
  phoneNumberValidation,
} from "../../constants/hepper";
import {
  CREATE_MEMBER,
  GET_ALL_MEMBERS,
  UPDATE_MEMBER,
  REMOVE_MEMBER,
} from "../../constants/api.js";

const initialState = {
  reload: null,
  actionSuccess: false,
  actionFailed: false,
  invalid: false,
};
const Member = (props) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(initialState);

  const columns = [
    {
      field: "full_name",
      title: "Fullname",
      editComponent: (props) => {
        if (props.value !== undefined && !fullNameValidation(props.value)) {
          return <MTableEditField {...props} error label="invalid" />;
        }
        return <MTableEditField {...props} />;
      },
    },
    {
      field: "phone_number",
      title: "Phone Number",
      editComponent: (props) => {
        if (props.value !== undefined && !phoneNumberValidation(props.value)) {
          return <MTableEditField {...props} error label="invalid" />;
        }
        return <MTableEditField {...props} />;
      },
    },
    {
      field: "birthday",
      title: "Birthday",
      render: (rowData) => {
        var date = new Date(rowData.birthday);
        return <span>{date.toLocaleDateString()}</span>;
      },
      editComponent: (props) => renderDatePicker(props),
      initialEditValue: moment(new Date()).local(),
    },
  ];

  useEffect(() => {
    if (state.reload !== false) {
      axios({
        method: "get",
        url: GET_ALL_MEMBERS,
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
    const { full_name, birthday, phone_number } = newData;
    return new Promise((resolve, reject) => {
      if (
        !full_name ||
        !birthday ||
        !phone_number ||
        !fullNameValidation(full_name) ||
        !phoneNumberValidation(phone_number) ||
        !dateValidation(birthday)
      ) {
        setState((prevState) => ({
          ...prevState,
          invalid: true,
        }));
        return reject();
      }
      axios({
        method: "post",
        url: CREATE_MEMBER,
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
        url: `${REMOVE_MEMBER}/${rowData._id}`,
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
    const { full_name, birthday, phone_number } = newData;
    return new Promise((resolve, reject) => {
      if (
        !full_name ||
        !birthday ||
        !phone_number ||
        !fullNameValidation(full_name) ||
        !phoneNumberValidation(phone_number) ||
        !dateValidation(birthday)
      ) {
        setState((prevState) => ({
          ...prevState,
          invalid: true,
        }));
        return reject();
      }
      axios({
        method: "put",
        url: `${UPDATE_MEMBER}/${oldData._id}`,
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

  const renderDatePicker = (props) => {
    const { value } = props;
    var offset = new Date().getTimezoneOffset();
    var date = value ? new Date(value) : new Date();
    date = new Date(date - offset * 60000);
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={date}
          onChange={(date) => {
            props.onChange(date);
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    );
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
        title="Members"
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
      />
    </>
  );
};
export { Member };
