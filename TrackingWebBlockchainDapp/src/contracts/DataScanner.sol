// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.4;

contract DataScanner {
    uint256 storedData;
    uint256 public ScannedDataCount = 0;

    struct ScannedData {
        uint256 id;
        string longitude;
        string latitude;
        string date;
        string idPackage;
        bool completed;
    }

    mapping(uint256 => ScannedData) public scannedDatas;

    event ScannedUpdateData(
        uint256 id,
        string longitude,
        string latitude,
        string date,
        string idPackage,
        bool completed
    );

    event ScannedDataUpdated(uint256 id, bool completed);

    constructor() public {
        updateScannedData(
            "19.2652343",
            "36.254622",
            "16:37:15 12/12/2021",
            "1200"
        );
    }

    function updateScannedData(
        string memory _longitude,
        string memory _latitude,
        string memory _date,
        string memory _idPackage
    ) public {
        ScannedDataCount++;
        scannedDatas[ScannedDataCount] = ScannedData(
            ScannedDataCount,
            _longitude,
            _latitude,
            _date,
            _idPackage,
            false
        );
        emit ScannedUpdateData(
            ScannedDataCount,
            _longitude,
            _latitude,
            _date,
            _idPackage,
            false
        );
    }
}
