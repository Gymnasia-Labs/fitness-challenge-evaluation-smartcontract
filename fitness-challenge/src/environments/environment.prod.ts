import { contracts } from './contracts';

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
  challengeManagerAddress: '0x120B235Ed9B45253664616Cf69224ef42612bD8F',
  challengeManagerAbi: [
    {
      anonymous: false,
      inputs: [
        {
          components: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'address', name: 'creator', type: 'address' },
            { internalType: 'uint256', name: 'start', type: 'uint256' },
            { internalType: 'uint256', name: 'end', type: 'uint256' },
            {
              internalType: 'uint256',
              name: 'currentParticipantsCount',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'maxParticipantsCount',
              type: 'uint256',
            },
            { internalType: 'uint256', name: 'fee', type: 'uint256' },
            { internalType: 'uint256', name: 'price', type: 'uint256' },
            { internalType: 'address', name: 'first', type: 'address' },
            { internalType: 'bool', name: 'redeemed', type: 'bool' },
          ],
          indexed: false,
          internalType: 'struct ChallengeManager.Challenge',
          name: 'challenge',
          type: 'tuple',
        },
      ],
      name: 'ChallengeCreated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'challenger', type: 'address' },
            { internalType: 'uint32[]', name: 'data', type: 'uint32[]' },
            { internalType: 'uint32[]', name: 'time', type: 'uint32[]' },
          ],
          indexed: false,
          internalType: 'struct ChallengeManager.LeaderboardEntry',
          name: 'leaderboardEntry',
          type: 'tuple',
        },
      ],
      name: 'LeaderboardEntryAdded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
        { internalType: 'address', name: 'sender', type: 'address' },
        { internalType: 'uint32[]', name: 'data', type: 'uint32[]' },
        { internalType: 'uint32[]', name: 'time', type: 'uint32[]' },
        { internalType: 'bool', name: 'withUnlock', type: 'bool' },
      ],
      name: 'addLeaderboardEntry',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'challenges',
      outputs: [
        { internalType: 'uint256', name: 'id', type: 'uint256' },
        { internalType: 'address', name: 'creator', type: 'address' },
        { internalType: 'uint256', name: 'start', type: 'uint256' },
        { internalType: 'uint256', name: 'end', type: 'uint256' },
        {
          internalType: 'uint256',
          name: 'currentParticipantsCount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'maxParticipantsCount',
          type: 'uint256',
        },
        { internalType: 'uint256', name: 'fee', type: 'uint256' },
        { internalType: 'uint256', name: 'price', type: 'uint256' },
        { internalType: 'address', name: 'first', type: 'address' },
        { internalType: 'bool', name: 'redeemed', type: 'bool' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint32[]', name: 'types', type: 'uint32[]' },
        { internalType: 'uint32[]', name: 'conditions', type: 'uint32[]' },
        { internalType: 'uint256', name: 'start', type: 'uint256' },
        { internalType: 'uint256', name: 'end', type: 'uint256' },
        {
          internalType: 'uint256',
          name: 'maxParticipantsCount',
          type: 'uint256',
        },
        { internalType: 'uint256', name: 'fee', type: 'uint256' },
        { internalType: 'address', name: 'evaluationAdr', type: 'address' },
      ],
      name: 'createChallenge',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'address', name: 'creator', type: 'address' },
            { internalType: 'uint256', name: 'start', type: 'uint256' },
            { internalType: 'uint256', name: 'end', type: 'uint256' },
            {
              internalType: 'uint256',
              name: 'currentParticipantsCount',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'maxParticipantsCount',
              type: 'uint256',
            },
            { internalType: 'uint256', name: 'fee', type: 'uint256' },
            { internalType: 'uint256', name: 'price', type: 'uint256' },
            { internalType: 'address', name: 'first', type: 'address' },
            { internalType: 'bool', name: 'redeemed', type: 'bool' },
          ],
          internalType: 'struct ChallengeManager.Challenge',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'evaluations',
      outputs: [
        { internalType: 'contract Evaluation', name: '', type: 'address' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getAllChallenges',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'id', type: 'uint256' },
            { internalType: 'address', name: 'creator', type: 'address' },
            { internalType: 'uint256', name: 'start', type: 'uint256' },
            { internalType: 'uint256', name: 'end', type: 'uint256' },
            {
              internalType: 'uint256',
              name: 'currentParticipantsCount',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'maxParticipantsCount',
              type: 'uint256',
            },
            { internalType: 'uint256', name: 'fee', type: 'uint256' },
            { internalType: 'uint256', name: 'price', type: 'uint256' },
            { internalType: 'address', name: 'first', type: 'address' },
            { internalType: 'bool', name: 'redeemed', type: 'bool' },
          ],
          internalType: 'struct ChallengeManager.Challenge[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      ],
      name: 'getChallengeRuleSet',
      outputs: [
        {
          components: [
            { internalType: 'uint32[]', name: 'types', type: 'uint32[]' },
            { internalType: 'uint32[]', name: 'conditions', type: 'uint32[]' },
          ],
          internalType: 'struct ChallengeManager.Rules',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      ],
      name: 'getCurrentParticipants',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      ],
      name: 'getEndOfChallenge',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      ],
      name: 'getFee',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
      name: 'getKeyPrice',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      ],
      name: 'getLeaderboard',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'challenger', type: 'address' },
            { internalType: 'uint32[]', name: 'data', type: 'uint32[]' },
            { internalType: 'uint32[]', name: 'time', type: 'uint32[]' },
          ],
          internalType: 'struct ChallengeManager.LeaderboardEntry[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
      name: 'getLock',
      outputs: [
        { internalType: 'contract IPublicLock', name: '', type: 'address' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      ],
      name: 'getMaxParticipants',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      ],
      name: 'getStartOfChallenge',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      ],
      name: 'getWinner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'gymnasiaFee',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' },
      ],
      name: 'leaderboards',
      outputs: [
        { internalType: 'address', name: 'challenger', type: 'address' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'adr', type: 'address' }],
      name: 'setChallenger',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'percentage', type: 'uint256' },
      ],
      name: 'setGymnasiaFee',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      ],
      name: 'setRedeemed',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  challengerAddress: '0x3b15d86805E5aD0E340F5Ab144BD21D10143A645',
  challengerAbi: [
    {
      inputs: [{ internalType: 'address', name: 'adr', type: 'address' }],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'winner',
          type: 'address',
        },
      ],
      name: 'PrizeReceived',
      type: 'event',
    },
    {
      inputs: [],
      name: 'getAddress',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
        { internalType: 'address', name: 'challenger', type: 'address' },
      ],
      name: 'hasUnlockedChallenge',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      ],
      name: 'isWinner',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      ],
      name: 'receivePrice',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      name: 'requests',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
        { internalType: 'uint32[]', name: 'conditions', type: 'uint32[]' },
        { internalType: 'uint32[]', name: 'time', type: 'uint32[]' },
      ],
      name: 'submitData',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
  ],
  minTimeEvaluation: '0xed9c2A0520D0768223130Ada9Ead95DDc66bb489',
};
