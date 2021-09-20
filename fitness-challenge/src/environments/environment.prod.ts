import { contracts } from "./contracts";

export const environment = {
  production: true,
  CONCEPT2_API : 'https://log.concept2.com', 
  GYMNASIA_API: 'https://api.gymnasia.app:3000',
  client_id: 'asWj9Gh7mrXWZI0JjoyLHP2aP2ytQV4dYQrX4w0k',
  client_secret: '',
  redirect_uri: 'https://www.gymnasia.app/#/',
  // challengeManagerAdress: contracts.challengeManagerAddress,
  // challengeManagerAbi: contracts.challengeManagerAbi,
  // challengerAddress: contracts.challengerAddress,
  // challengerAbi: contracts.challengerAbi,
  challengeManagerAddress: '0x5cBCf07F184fA9031fb1cAa01d45b496C098BD49',
challengeManagerAbi : [
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "challenges",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "start",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "end",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "currentParticipantsCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxParticipantsCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "first",
        "type": "address"
      },
      {
        "internalType": "contract Evaluation",
        "name": "evaluation",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getKeyPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getLock",
    "outputs": [
      {
        "internalType": "contract IPublicLock",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "leaderboard",
    "outputs": [
      {
        "internalType": "address",
        "name": "challenger",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "data",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "adr",
        "type": "address"
      }
    ],
    "name": "setChallenger",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      }
    ],
    "name": "setDisplayedChallengeID",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getDisplayedChallengeID",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "rules",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "start",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "end",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxParticipantsCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "evaluationAdr",
        "type": "address"
      }
    ],
    "name": "createChallenge",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "end",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "currentParticipantsCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxParticipantsCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "first",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "challenger",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "data",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
              }
            ],
            "internalType": "struct ChallengeManager.LeaderboardEntry[]",
            "name": "leaderBoard",
            "type": "tuple[]"
          },
          {
            "internalType": "contract Evaluation",
            "name": "evaluation",
            "type": "address"
          }
        ],
        "internalType": "struct ChallengeManager.Challenge",
        "name": "",
        "type": "tuple"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "data",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "withUnlock",
        "type": "bool"
      }
    ],
    "name": "addLeaderboardEntry",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      }
    ],
    "name": "getWinner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAllChallenges",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "end",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "currentParticipantsCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxParticipantsCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "first",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "challenger",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "data",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
              }
            ],
            "internalType": "struct ChallengeManager.LeaderboardEntry[]",
            "name": "leaderBoard",
            "type": "tuple[]"
          },
          {
            "internalType": "contract Evaluation",
            "name": "evaluation",
            "type": "address"
          }
        ],
        "internalType": "struct ChallengeManager.Challenge[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      }
    ],
    "name": "getMaxParticipants",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      }
    ],
    "name": "getCurrentParticipants",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
],
challengerAddress: '0x23a0B5eaFce73a74d057F5d7e35317c70CAe66BE',
challengerAbi:[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "adr",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "data",
        "type": "uint32"
      },
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "submitData",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      }
    ],
    "name": "receivePrice",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      }
    ],
    "name": "isWinner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengeId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "challenger",
        "type": "address"
      }
    ],
    "name": "hasUnlockedChallenge",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
],
};
