const Migrations = artifacts.require("DataScanner");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
