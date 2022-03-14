// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { contracts } from "./contracts";

export const environment = {
  production: false,
  CONCEPT2_API: 'https://log-dev.concept2.com',
  // CONCEPT2_API: 'https://log.concept2.com',
  // GYMNASIA_API: 'https://log-dev.concept2.com',
  GYMNASIA_API: 'https://api.gymnasia.app:3000',
  client_id: 'asWj9Gh7mrXWZI0JjoyLHP2aP2ytQV4dYQrX4w0k',
  client_secret: '',
  redirect_uri: 'http://localhost:4200/#/',
  challengeManagerAddress: contracts.challengeManagerAddress,
  challengeManagerAbi: contracts.challengeManagerAbi,
  challengerAddress: contracts.challengerAddress,
  challengerAbi: contracts.challengerAbi,
  minTimeEvaluation: contracts.minTimeEvaluation
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
