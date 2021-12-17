import axios from "axios";

const API_URL = "http://localhost:8900/";

class ServicesScanData {
  //Get
  async getAllTrackedData() {
    return await axios
      .get(API_URL + "trackingData")
      .then((res) => {
        console.log("ehe");
        let resData = res.data;
        return resData;
      })
      .catch((error) => {
        console.log(
          "There is a problem with the fetch operation: " + error.message
        );
        throw error;
      });
  }

  async getAllTrackedDataNotValidated() {
    return await axios
      .get(API_URL + "trackingData/validatedFalse")
      .then((res) => {
        console.log("ehe");
        let resData = res.data;
        return resData;
      })
      .catch((error) => {
        console.log(
          "There is a problem with the fetch operation: " + error.message
        );
        throw error;
      });
  }

  async getAllTrackedDataByValidityFalseAndIdPackage(idPackage) {
    return await axios
      .get(API_URL + "trackingData/validatedFalse/" + idPackage)
      .then((res) => {
        console.log("ehe");
        let resData = res.data;
        return resData;
      })
      .catch((error) => {
        console.log(
          "There is a problem with the fetch operation: " + error.message
        );
        throw error;
      });
  }

  // Post tracking data
  async addTrackedData(trackingData) {
    await axios.post(API_URL + "trackingData", trackingData);
  }

  async deleteTrackedData(dataId) {
    await axios.delete(API_URL + "trackingData/" + dataId);
  }
}

export default new ServicesScanData();
