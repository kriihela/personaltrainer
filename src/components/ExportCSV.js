import React, { Component } from 'react';
import { CSVLink } from "react-csv";
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

const headers = [
  { label: "First name", key: "firstname" },
  { label: "Last name", key: "lastname" },
  { label: "Address", key: "streetaddress" },
  { label: "Postcode", key: "postcode" },
  { label: "City", key: "city" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
];

class ExportCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.csvLinkEl = React.createRef();
  }

  getCustomers = () => {
    return fetch('https://customerrest.herokuapp.com/getcustomers')
      .then(res => res.json());
  }

  downloadReport = async () => {
    const data = await this.getCustomers();
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <Button style={{margin: 10}} variant="outlined" size="small" color="secondary" startIcon={<DownloadIcon />} onClick={this.downloadReport}>
        Export to CSV
        </Button>
        <CSVLink
          headers={headers}
          filename="Customerlist.csv"
          data={data}
          ref={this.csvLinkEl}
        />
      </div>
    );
  }
}

export default ExportCSV;