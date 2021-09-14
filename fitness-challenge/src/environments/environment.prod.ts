import { contracts } from "./contracts";

export const environment = {
  production: true,
  CONCEPT2_API : 'https://log.concept2.com', 
  GYMNASIA_API: 'https://api.gymnasia.app:3000',
  client_id: 'asWj9Gh7mrXWZI0JjoyLHP2aP2ytQV4dYQrX4w0k',
  client_secret: '',
  redirect_uri: 'https://www.gymnasia.app/#/',
  challengeManagerAdress: contracts.challengeManagerAddress,
  challengeManagerAbi: contracts.challengeManagerAbi,
  challengerAddress: contracts.challengerAddress,
  challengerAbi: contracts.challengerAbi
};
