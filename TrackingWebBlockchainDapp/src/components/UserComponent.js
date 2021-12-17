import React, { Component } from "react";
import MapWrapped from "./MapWrapped";
import Web3 from "web3";
import DataScanner from "../abis/DataScanner.json";
import { Row, Container, Col } from "react-bootstrap";
class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idPackage: "",
      scannedDatas: [],
      arrayDBScannedDataNotValidated: [], // AdAm
      finalArrayWithBlockchainData: [],
      arrayBlockchainFromPackage: [], //Tracked Data from the BD
    };
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData().then(() => {
      this.getDataFromBlockchainfiltered(256);
      console.log(this.state.finalArrayWithBlockchainData);
    });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = DataScanner.networks[networkId];
    if (networkData) {
      const abi = DataScanner.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });
      const ScannedDataCount = await contract.methods.ScannedDataCount().call();
      this.setState({ ScannedDataCount });
      // Load the data inputed
      for (var i = 1; i <= ScannedDataCount; i++) {
        const scannerInput = await contract.methods.scannedDatas(i).call();
        this.setState({
          scannedDatas: [...this.state.scannedDatas, scannerInput],
        });
      }
    } else {
      window.alert("Smart contract not deployed to detect network");
    }
  }
  getDataFromBlockchainfiltered = (idPackage) => {
    //scannedDataWithIdPackage;
    for (var i = 0; i < this.state.scannedDatas.length; i++) {
      if (this.state.scannedDatas[i]["idPackage"] == idPackage) {
        // console.log("The data scanned containing this id" + idPackage);
        //console.log(this.state.scannedDatas[i]);
        this.state.finalArrayWithBlockchainData.push({
          lng: this.state.scannedDatas[i][1],
          lat: this.state.scannedDatas[i][2],
          date: this.state.scannedDatas[i][3],
          idPackage: this.state.scannedDatas[i][4],
        });
      }
    }
  };

  render() {
    this.state.arrayBlockchainFromPackage = [
      {
        lat: 37.20743442057966,
        lng: 9.666982773826687,
        date: "12:12:26 11/12/21",
        idPackage: 256,
      },
      {
        lat: 37.15792557011335,
        lng: 9.29482090294704,
        date: "11:12:26 12/12/21",
        idPackage: 256,
      },
      {
        lat: 37.24543299552031,
        lng: 9.760709882775965,
        date: "09:14:09 17/12/21",
        idPackage: 256,
      },
      {
        lat: 37.02044400497422,
        lng: 9.855810297325888,
        date: "09:12:09 15/12/21",
        idPackage: 327,
      },
    ];
    //this.state.arrayBlockchainFromPackage = this.props.finalArray;
    return (
      <div>
        <Container style={{ padding: 5, minWidth: "100vw" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Row>
              <Col style={{ marginTop: "auto", marginBottom: "auto" }}>
                <h1>Enter you id Package</h1>
              </Col>

              <Col style={{ marginTop: "auto", marginBottom: "auto" }}>
                <input type="text" className="form-control mb-1" />
              </Col>
              <Col style={{ marginTop: "auto", marginBottom: "auto" }}>
                <input
                  type="submit"
                  className="btn btn-block btn-primary"
                  value="Find package"
                />
                {/* {this.state.arrayDBScannedDataNotValidated
                    .slice(0, 1)
                    .map((key, i) => (
                      <input
                        readOnly
                        type="text"
                        value={
                          this.state.arrayDBScannedDataNotValidated[0][
                            "longitude"
                          ]
                        }
                        className="form-control mb-1"
                      />
                    ))} */}
              </Col>
            </Row>
          </form>
        </Container>
        <div style={{ width: "100vw", height: "100vh" }}>
          <MapWrapped pos={this.state.arrayBlockchainFromPackage} />
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">longitude</th>
                <th scope="col">latitude</th>
                <th scope="col">date</th>
                <th scope="col">idPackage</th>
              </tr>
            </thead>
            <tbody id="productList">
              {this.state.scannedDatas.map((scannerInput, key) => {
                return (
                  <tr key={key} className="col-md-3 mb-3">
                    <th scope="row">{parseInt(scannerInput.id._hex, 16)}</th>
                    <td>{scannerInput.longitude}</td>
                    <td>{scannerInput.latitude}</td>
                    <td>{scannerInput.date}</td>
                    <td>{scannerInput.idPackage}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr />
        </div>
      </div>
    );
  }
}

export default UserComponent;
