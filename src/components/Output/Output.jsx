import { React, useState, useEffect } from "react";
import * as d3 from "d3";
import { Button, LinearProgress } from "@material-ui/core";

import styles from "./Output.module.css";

const url = "http://127.0.0.1:8000";

const Output = ({ isUploaded }) => {
  const [showResults, setShowResults] = useState(false);
  const [csvData, setCsvData] = useState([]);


  const handleResultClick = () => {
    if (!showResults) {
      d3.csv(`${url}/csv`).then((res) => {
        setCsvData(res);
      });
    }
    setShowResults(!showResults);
  };

  const Results = () => (
    <div className={styles.content}>
      <div>
        <img src={`${url}/picture`} alt={"123"}/>
      </div>
      <div>
        <a
          href={`${url}/csv`}
          download={"output.csv"}
          align="center"
        >
          <Button>
            <i className="fas fa-download" />
            Download CSV
          </Button>
        </a>
        <table>
          <tbody>
            <tr>
              <td>Index</td>
              <td>Lasso</td>
              <td>Elastic</td>
            </tr>
          </tbody>
          {csvData.map((item, index) => (
            <tbody>
              <tr>
                <td>{index}</td>
                {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))}
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
  return (
    <div className={styles.container}>
      <div className={styles.resultButtonDiv}>
        <Button
          variant="contained"
          component="label"
          onClick={handleResultClick}
          disabled={!isUploaded}
        >
          Show/Hide Result
        </Button>
      </div>
      {showResults ? <Results /> : null}
    </div>
  );
};

export default Output;
