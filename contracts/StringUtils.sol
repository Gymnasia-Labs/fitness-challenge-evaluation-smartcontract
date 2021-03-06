// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.9.0;

library StringUtils {
    function append(string memory _a, string memory _b)
        internal
        pure
        returns (string memory _concatenatedString)
    {
        return string(abi.encodePacked(_a, _b));
    }

    function append(
        string memory _a,
        string memory _b,
        string memory _c
    ) internal pure returns (string memory _concatenatedString) {
        return string(abi.encodePacked(_a, _b, _c));
    }

    function append(
        string memory _a,
        string memory _b,
        string memory _c,
        string memory _d
    ) internal pure returns (string memory _concatenatedString) {
        return string(abi.encodePacked(_a, _b, _c, _d));
    }

    function append(
        string memory _a,
        string memory _b,
        string memory _c,
        string memory _d,
        string memory _e
    ) internal pure returns (string memory _concatenatedString) {
        return string(abi.encodePacked(_a, _b, _c, _d, _e));
    }

    function uintToString(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        uint256 c = _i;
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len - 1;
        while (c != 0) {
            bstr[k--] = bytes1(uint8(48 + (c % 10)));
            c /= 10;
        }
        return string(bstr);
    }
}
