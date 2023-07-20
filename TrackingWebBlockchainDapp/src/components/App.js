import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import DataScanner from "../abis/DataScanner.json";
import ServiceScanData from "../services/ServicesScanData";
import MapWrapped from "./MapWrapped";
import { Row, Container, Col } from "react-bootstrap";
import emptyBox from "../1376786.png";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: "",
      latitude: "",
      date: "",
      idPackage: "",
      web3: null,
      contract: null,
      account: "",
      allDataValidated: false,
      totalInputCount: 0,
      scannedDatas: [],
      arrayDBScannedData: [], //Tracked Data from the BD
      arrayDBScannedDataNotValidated: [], // AdAm
      finalArrayWithBlockchainData: [],
    };
  }

  async initDataComponent() {
    let arrayDBScannedData = await ServiceScanData.getAllTrackedData();
    this.state.arrayDBScannedData = arrayDBScannedData;
    this.setState({ arrayDBScannedData });
  }
  async initDataNotValidated(idPackage) {
    let arrayDBScannedDataNotValidated = await ServiceScanData.getAllTrackedDataByValidityFalseAndIdPackage(
      idPackage
    );
    this.state.arrayDBScannedDataNotValidated = arrayDBScannedDataNotValidated;
    this.setState({ arrayDBScannedDataNotValidated });
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData().then(() => {
      this.getDataFromBlockchainfiltered(256);
      console.log(this.state.finalArrayWithBlockchainData);
    });

    await this.initDataComponent()
      .then(() => {
        this.initDataNotValidated(
          this.state.arrayDBScannedData[0]["idPackage"]
        );
      })
      .catch((e) => {
        if (this.state.arrayDBScannedData.length === 0) {
          this.state.arrayDBScannedData[0] = 0;
          this.setState((e) => ({
            allDataValidated: true,
          }));
        }

        return (
          <div>
            <p>Donee</p>
          </div>
        );
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

  sendData = (longitude, latitude, date, idPackage) => {
    try {
      this.state.contract.methods
        .updateScannedData(longitude, latitude, date, idPackage)
        .send({ from: this.state.account })
        .once("receipt", (receipt) => {
          this.state({
            scannedDatas: [
              ...this.state.scannedDatas,
              longitude,
              latitude,
              date,
              idPackage,
            ],
          });
        });
      ServiceScanData.deleteTrackedData(
        this.state.arrayDBScannedDataNotValidated[0]["id"]
      );
      this.setState();
      //this.initDataNotValidated(this.state.arrayDBScannedData[0]["idPackage"]);
      // console.log(this.state.longitude);
      // console.log(this.state.latitude);
    } catch (e) {
      console.log(e.message);
      if (e.message.includes("User denied transaction signature")) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      }
    }
  };

  getDataFromBlockchainfiltered = (idPackage) => {
    //scannedDataWithIdPackage;
    for (var i = 0; i < this.state.scannedDatas.length; i++) {
      if (this.state.scannedDatas[i]["idPackage"] === idPackage) {
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
    return (
      <div>
        <Container style={{ margin: 5, minWidth: "100vw" }}>
          <Row>
            <Col sm={4}>
              <h1>Add Data Here</h1>
              <br />
              {/* {console.log(this.state.allDataValidated)} */}
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const longitude = this.state
                    .arrayDBScannedDataNotValidated[0]["longitude"];
                  const latitude = this.state.arrayDBScannedDataNotValidated[0][
                    "latitude"
                  ];
                  const date = this.state.arrayDBScannedDataNotValidated[0][
                    "date"
                  ];
                  const idPackage = this.state
                    .arrayDBScannedDataNotValidated[0]["idPackage"];
                  this.sendData(longitude, latitude, date, idPackage);
                }}
              >
                {this.state.arrayDBScannedDataNotValidated
                  .slice(0, 1)
                  .map((key, i) => (
                    <>
                      <label
                        htmlFor="longitude"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Longitude{" "}
                      </label>
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
                    </>
                  ))}
                {this.state.arrayDBScannedDataNotValidated
                  .slice(0, 1)
                  .map((key, i) => (
                    <>
                      <label
                        htmlFor="latitude"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Latitude{" "}
                      </label>
                      <input
                        readOnly
                        type="text"
                        value={
                          this.state.arrayDBScannedDataNotValidated[0][
                          "latitude"
                          ]
                        }
                        className="form-control mb-1"
                      />
                    </>
                  ))}
                {this.state.arrayDBScannedDataNotValidated
                  .slice(0, 1)
                  .map((key, i) => (
                    <>
                      <label
                        htmlFor="date"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Date{" "}
                      </label>
                      <input
                        readOnly
                        type="text"
                        value={
                          this.state.arrayDBScannedDataNotValidated[0]["date"]
                        }
                        className="form-control mb-1"
                      />
                    </>
                  ))}
                {this.state.arrayDBScannedDataNotValidated
                  .slice(0, 1)
                  .map((key, i) => (
                    <>
                      <label
                        htmlFor="idPackage"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Package ID{" "}
                      </label>
                      <input
                        readOnly
                        type="text"
                        value={
                          this.state.arrayDBScannedDataNotValidated[0][
                          "idPackage"
                          ]
                        }
                        className="form-control mb-1"
                      />
                    </>
                  ))}
                {this.state.arrayDBScannedDataNotValidated.length !== 0 ? (
                  <input
                    type="submit"
                    className="btn btn-block btn-primary mt-4"
                    value="Send Data"
                  />
                ) : (
                  <span>
                    <img src={emptyBox} alt="empty box" style={{ width: "70%" }} />
                    <h2>No New Data to Send</h2>
                  </span>
                )}
              </form>
            </Col>
            <Col xl={8}>
              {" "}
              <MapWrapped kaka={this.state.arrayDBScannedDataNotValidated[0]} />
            </Col>
            {/* <UserComponent
                finalArray={this.state.finalArrayWithBlockchainData}
              /> */}
          </Row>
        </Container>
        <di>
          <p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </p>
        </di>
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
    );
  }
}

export default App;
