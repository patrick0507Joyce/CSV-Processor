import { React, useState, useRef, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

import styles from "./FileUpload.module.css";

const url = "http://127.0.0.1:8000";

const FileUpload = ({ setUploadStatus }) => {
  const inputRef = useRef();
  const [file, setFiles] = useState(null);
  const [progress, setProgess] = useState(0); // progess bar
  const [emptyFileErrorStatus, setEmptyFileErrorStatus] = useState(false);
  const [correctTriggerStatus, setCorrectTriggerStatus] = useState(false);
  const [successProcessStatus, setSuccessProcessStatus] = useState(false);
  const [failedProcessStatus, setFailedProcessStatus] = useState(false);

  useEffect(() => {
    console.log("file is: ", file);
  });

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleUploadEvent = () => {
    if (!file) {
      setEmptyFileErrorStatus(true);
      setCorrectTriggerStatus(false);
      return;
    }
    setCorrectTriggerStatus(true);
    setEmptyFileErrorStatus(false);
    const formData = new FormData();
    formData.append("file", file); // appending file

    axios
      .post(`${url}/upload`, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          setProgess(progress);
        },
      })
      .then((res) => {
        console.log(res.status);
        if (res.status == "200") {
          setUploadStatus(true);
          setSuccessProcessStatus(true);
          setFailedProcessStatus(false);
        } else {
          console.log(res.status);
          setUploadStatus(false);

          setSuccessProcessStatus(false);
          setFailedProcessStatus(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setFailedProcessStatus(true);
      });
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setEmptyFileErrorStatus(false);
  };

  const handleInfoClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCorrectTriggerStatus(false);
  };

  const handleSuccessProcessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessProcessStatus(false);
  };

  const handleFailedProcessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFailedProcessStatus(false);
  };

  return (
    <div className={styles.container}>
      <Input
        color="primary"
        type="file"
        inputProps={{ accept: "text/csv" }}
        inputRef={inputRef}
        onChange={() => setFiles(inputRef.current.files[0])}
        className={styles.inputBox}
      />
      <Button variant="contained" component="label" onClick={handleUploadEvent}>
        Upload CSV File
      </Button>
      <Snackbar
        open={emptyFileErrorStatus}
        autoHideDuration={1000}
        onClick={handleErrorClose}
        onClose={handleErrorClose}
      >
        <Alert severity="error">CSV file is still not selected</Alert>
      </Snackbar>
      <Snackbar
        open={correctTriggerStatus}
        autoHideDuration={1000}
        onClick={handleInfoClose}
        onClose={handleInfoClose}
      >
        <Alert severity="info">CSV file is ready and has been uploaded</Alert>
      </Snackbar>
      <Snackbar
        open={successProcessStatus}
        autoHideDuration={1000}
        onClick={handleSuccessProcessClose}
        onClose={handleSuccessProcessClose}
      >
        <Alert severity="success">csv file is successfully Processed</Alert>
      </Snackbar>
      <Snackbar
        open={failedProcessStatus}
        autoHideDuration={1000}
        onClick={handleFailedProcessClose}
        onClose={handleFailedProcessClose}
      >
        <Alert severity="error">
          CSV processing script failed in the backend
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FileUpload;
