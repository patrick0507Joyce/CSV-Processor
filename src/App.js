import { React, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Login, FileUpload, Output } from "./components";
import styles from "./App.module.css";
import logo from "./images/csv-icon.png";

const App = () => {
  const [uploadStatus, setUploadStatus] = useState(false);

  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className={styles.container}>
        <img src={logo} alt="logo" className={styles.logo} />
        <FileUpload setUploadStatus={setUploadStatus} />
        <Output isUploaded={uploadStatus} />
      </div>
    );
  } else {
    return <Login />;
  }
};

export default App;

/*
                <FileUpload setUploadStatus={setUploadStatus}/>
                <Output isUploaded={uploadStatus}/>
*/
