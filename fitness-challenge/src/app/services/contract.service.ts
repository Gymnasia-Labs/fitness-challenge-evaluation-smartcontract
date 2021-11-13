import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { ethers, utils } from 'ethers';
import { fetchChallenges, setAddress, setChallenges } from '../ngrx/app.actions';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Challenge, LeaderBoard } from '../models/challenge';

declare const window: any;

export const WEB3PROVIDER = new InjectionToken('Web3 provider', {
  providedIn: 'root',
  factory: () => (window as any).ethereum
});

export const trainingTypes = new Map([
  ["rower", 0],
  ["skierg", 1],
  ["bike", 2],
  ["paddle", 3],
  ["water", 4],
  ["snow", 5],
  ["rollerski", 6],
  ["slides", 7],
  ["dynamic", 8],
]);

const evaluation = '0x615588c053Be083FBaB67e37Aade7B3D90ce40a6';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  public address: any;
  public provider: any;
  private userAddress: string = '';



  // Contracts
  public challengeManager: any;
  public challenger: any;

  constructor(
    @Inject(WEB3PROVIDER) public web3provider: any,
    private store: Store
  ) {

    if (typeof window.ethereum !== 'undefined') {
      // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      this.provider.on("network", (newNetwork: any, oldNetwork: any) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network

        if (oldNetwork) {
          window.location.reload();
        } else
          if (newNetwork.name !== 'rinkeby') {
            alert('please use rinkeby network');
          }
      });
      this.web3provider.enable()
        .then((address: string) => {
          this.userAddress = address[0];
          this.store.dispatch(setAddress({ address: address[0] }))
        }
        );
      this.connectContract(this.provider);
    }


  }

  public async connectMetamask() {

    const provider = new WalletConnectProvider({
      infuraId: "341f93e32677417caab076c24bdc90ea",
    });
    this.provider = provider;

    provider.on("accountsChanged", (accounts: string[]) => {
      this.userAddress = accounts[0];
      this.store.dispatch(setAddress({ address: accounts[0] }));
    });
    this.provider.enable();

    this.web3provider.enable()
      .then((address: string) => {
        this.userAddress = address[0];
        this.store.dispatch(setAddress({ address: address[0] }))
      }
      );

    this.connectContract(this.provider);
  }

  private connectContract(provider: any) {
    this.challengeManager = new ethers.Contract(environment.challengeManagerAddress, environment.challengeManagerAbi, provider);
    this.challengeManager = this.challengeManager.connect(provider.getSigner());

    this.challenger = new ethers.Contract(environment.challengerAddress, environment.challengerAbi, provider);
    this.challenger = this.challenger.connect(provider.getSigner());
    this.store.dispatch({ type: fetchChallenges });
  }

  public getUnsignedTransaction(contract: any, functionName: string, args: Array<any>) {
    return contract.interface.functions[functionName].encode(args);
  };

  public createChallenge(
    title: string,
    description: string,
    start: number,
    end: number,
    participantsCount: number,
    price: string,
    meters: number,
    traningtype: string
  ): Observable<boolean> {
    return of(
      this.challengeManager.createChallenge(
        title,
        [trainingTypes.get(traningtype)],
        [meters],
        start,
        end,
        participantsCount,
        ethers.utils.parseEther('' + price),
        evaluation,
        {
          gasLimit: 5000000
        }
      ),

    );
  }

  public getChallenges(): Promise<any[]> {
    return this.challengeManager.getAllChallenges();
  }

  public getLeaderBoard(id: number): Promise<LeaderBoard[]> {
    return this.challengeManager.getLeaderboard(id);
  }

  public isWinner(id: number): Promise<boolean> {
    return this.challenger.isWinner(id);
  }

  public async submitChallenge(id: number, data: string, time: number, fee: number) {
    data = data.substring(0, data.length - 1);
    console.log('FEE', fee);

    let challengeUnlocked = await this.challenger.hasUnlockedChallenge(id, this.userAddress);
    let args = {};
    if (!challengeUnlocked) {
      let gas = await this.challenger.estimateGas.submitData(id, [+data], [time], { value: fee });
      let add = gas.div(2);
      gas = gas.add(add);

      args = {
        value: fee,
        gasLimit: gas
      };
    }

    this.challenger.submitData(id, [+data], [time], args)

  }

  redeemPrice(id: number) {
    return this.challenger.receivePrice(id);
  }

  getChallengeRuleset(id: number) {
    return this.challengeManager.getChallengeRuleSet(id);
  }

}
