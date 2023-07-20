# blockchain-dapp-cs-challenge
A package tracking decentrilized application based on the Blockchain for the cs challenge 2021

-I-
1- Start by opening your WAMP or XAMP and starting the MySQL database
2- cd TrackingSpringBackend
3- Go the the appliaction.properties and change your creadential or configure the database as you like
[Image goes her]
4- mvn install
5- mvn spring-boot:run

Let you spring boot app running and move on to the next step

-II-
1- Open ganache and create a new project
[We can add an image gere]
2- Delete the files in TrackingWebBlockchainDapp/abis

3- cd TrackingWebBlockchainDapp
4- truffle migrate
[image goes here]

4- npm install
5- npm run start
6- Now connect with your MetaMask account with ganache
[Images goes here]


-III-
1- cd TrackingMobileApp
2- npm install
3- npm run start
this will open the expo CLI and will give you a QR code that you can scan to open the app on your mobile ( you have to be connected to the same wifi )
[Expo image here]



And that's it, now you can use the mobile app to scan packages QR and send their data to the blockchain after the admin confirm them
