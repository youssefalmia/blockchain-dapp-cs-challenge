# Blockchain DApp for Package Tracking

This repository contains a decentralized application (DApp) for package tracking based on the Blockchain, created as part of the CS Challenge 2021.

## Prerequisites

Before running the application, ensure you have the following software installed and configured:

1. WAMP or XAMPP with a running MySQL database.
2. Ganache, a local Ethereum blockchain for development and testing purposes.
3. MetaMask, a browser extension for interacting with the Ethereum blockchain.
4. Node.js and npm installed on your system.

## Installation and Setup

Follow the steps below to set up and run the application:

### Step I - Setup the Spring Backend

1. Start by opening your WAMP or XAMPP and ensure the MySQL database is running.

2. Open a terminal and navigate to the `TrackingSpringBackend` directory.

3. In the `application.properties` file, update your database credentials or configure the database settings as per your requirements.

  ![Database Config](https://raw.githubusercontent.com/youssefalmia/blockchain-dapp-cs-challenge/main/ProjectRelatedPics/Rootroot.png)

4. Build the Spring backend using Maven:

  ```bash
  mvn install
  ```
5. Run the Spring Boot application:

  ```bash
  mvn spring-boot:run
  ```

Let your spring boot app running and move on to the next step

### Step II - Setup the Blockchain DApp

1. Open ganache and create a new project
2. Delete the existing files in the TrackingWebBlockchainDapp/abis directory.

3. Navigate to the TrackingWebBlockchainDapp directory in the terminal.
4. Migrate the smart contracts to the Ganache blockchain:

```bash
  truffle migrate
```
![Smart contract migration](https://github.com/youssefalmia/blockchain-dapp-cs-challenge/blob/main/ProjectRelatedPics/TruffleMigrate.png)

5. Install the required dependencies for the web application:

```bash
  npm install
```

6. Start the web application:

```bash
  npm run start
```
Make sure you have MetaMask installed and connected to your Ganache account.

<details>
<summary>
  More details about the MetaMask and Ganache configuration
</summary>

![Ganache Network](https://github.com/youssefalmia/blockchain-dapp-cs-challenge/blob/main/ProjectRelatedPics/GanacheNetwork.png)

![Ganache Account](https://github.com/youssefalmia/blockchain-dapp-cs-challenge/blob/main/ProjectRelatedPics/AccountGanache.png)

![Metamask Key](https://github.com/youssefalmia/blockchain-dapp-cs-challenge/blob/main/ProjectRelatedPics/ValidKey.png)

</details>

### Step III - Setup the Mobile App

1. Navigate to the TrackingMobileApp directory in the terminal.
2. Install the required dependencies for the mobile app:

```bash
  npm install
```

3. Start the Expo CLI:

```bash
  npm run start
```
The Expo CLI will generate a QR code, which you can scan with your mobile device to open the app (ensure both your computer and mobile device are connected to the same Wi-Fi network).

Now your application is ready to use. The mobile app allows you to scan package QR codes and send their data to the blockchain once the admin confirms them.

Happy package tracking with the Blockchain DApp!

### Contributing
Contributions to the project are welcome. Feel free to submit issues and pull requests.

### DApp demo ( wait for it, it may take some time to load )

![DApp demo gif](https://github.com/youssefalmia/blockchain-dapp-cs-challenge/blob/main/ProjectRelatedPics/BlockchainTrackingApp.gif)