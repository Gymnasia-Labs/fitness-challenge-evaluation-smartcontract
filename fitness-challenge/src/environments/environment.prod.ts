import { contracts } from "./contracts";

export const environment = {
  production: true,
  CONCEPT2_API: 'https://log.concept2.com',
  GYMNASIA_API: 'https://api.gymnasia.app:3000',
  client_id: 'asWj9Gh7mrXWZI0JjoyLHP2aP2ytQV4dYQrX4w0k',
  client_secret: '',
  redirect_uri: 'https://www.gymnasia.app/#/',
  // challengeManagerAdress: contracts.challengeManagerAddress,
  // challengeManagerAbi: contracts.challengeManagerAbi,
  // challengerAddress: contracts.challengerAddress,
  // challengerAbi: contracts.challengerAbi,
  challengeManagerAddress: '0xc929e1dE79ae0a5dDCf867e50dc4A8Ae87CE1B51',
  challengeManagerAbi: [
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
          "internalType": "bool",
          "name": "redeemed",
          "type": "bool"
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
      "name": "evaluations",
      "outputs": [
        {
          "internalType": "contract Evaluation",
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
      "inputs": [],
      "name": "gymnasiaFee",
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
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "leaderboards",
      "outputs": [
        {
          "internalType": "address",
          "name": "challenger",
          "type": "address"
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
      "name": "setRedeemed",
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
          "name": "percentage",
          "type": "uint256"
        }
      ],
      "name": "setGymnasiaFee",
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
      "name": "getFee",
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
          "internalType": "uint32[]",
          "name": "types",
          "type": "uint32[]"
        },
        {
          "internalType": "uint32[]",
          "name": "conditions",
          "type": "uint32[]"
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
              "internalType": "bool",
              "name": "redeemed",
              "type": "bool"
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
          "internalType": "uint32[]",
          "name": "data",
          "type": "uint32[]"
        },
        {
          "internalType": "uint32[]",
          "name": "time",
          "type": "uint32[]"
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
              "internalType": "bool",
              "name": "redeemed",
              "type": "bool"
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
      "name": "getChallengeRuleSet",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint32[]",
              "name": "types",
              "type": "uint32[]"
            },
            {
              "internalType": "uint32[]",
              "name": "conditions",
              "type": "uint32[]"
            }
          ],
          "internalType": "struct ChallengeManager.Rules",
          "name": "",
          "type": "tuple"
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
      "name": "getEndOfChallenge",
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
      "name": "getStartOfChallenge",
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
      "name": "getLeaderboard",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "challenger",
              "type": "address"
            },
            {
              "internalType": "uint32[]",
              "name": "data",
              "type": "uint32[]"
            },
            {
              "internalType": "uint32[]",
              "name": "time",
              "type": "uint32[]"
            }
          ],
          "internalType": "struct ChallengeManager.LeaderboardEntry[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  challengerAddress: '0xb1840360Bb3235Daa173b52903E4C9C65361D64a',
  challengerAbi: [
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
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "requests",
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
          "internalType": "uint256",
          "name": "challengeId",
          "type": "uint256"
        },
        {
          "internalType": "uint32[]",
          "name": "conditions",
          "type": "uint32[]"
        },
        {
          "internalType": "uint32[]",
          "name": "time",
          "type": "uint32[]"
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
  minTimeEvaluation: '0x3989c1d7ff8A74b926593E56435A0E4c4Fe38415'
};
