import axios from "axios";

const API_URL = "http://192.168.100.46:8900/";

class ServicesScanData {
  //Get
  async getAllTrackedData() {
    return await axios.get(API_URL + "trackingData");
  }

  // Post tracking data
  async addTrackedData(trackingData) {
    await axios.post(API_URL + "trackingData", trackingData);
  }
}

export default new ServicesScanData();
