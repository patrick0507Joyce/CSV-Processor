import axios from 'axios'

const url = "https://aisquare-csv-processor.herokuapp.com"

export const fetchCSV = () => {
    try {
        axios({
            url: `${url}/csv`,
            method: 'GET',
            responseType: 'blob',
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'output.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
          });
    } catch(error) {
        console.log(error);
    }
}
