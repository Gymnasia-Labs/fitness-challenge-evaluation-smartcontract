import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { ethers, utils } from 'ethers';
import { fetchChallenges, setAddress, setChallenges } from '../ngrx/app.actions';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Challenge } from '../models/challenge';

declare const window: any;

export const WEB3PROVIDER = new InjectionToken('Web3 provider', {
  providedIn: 'root',
  factory: () => (window as any).ethereum
});

const evaluation = '0xA55A8169e38bb3fBBDD6D0A4A4EBb2da0F7E9fA6';

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
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    });
    provider.on("accountsChanged", (accounts: string[]) => {
      this.userAddress = accounts[0];
      this.store.dispatch(setAddress({ address: accounts[0] }));
    });
    provider.enable();

    this.connectContract(provider);
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
    meters: number
  ): Observable<boolean> {
    return of(this.challengeManager.createChallenge(title, description, meters, start, end, participantsCount, ethers.utils.parseEther('' + price), evaluation));
  }

  public getChallenges(): Promise<Challenge[]> {
    return this.challengeManager.getAllChallenges();
  }

  public async submitChallenge(id: number, data: string, time: number) {
    data = data.substring(0, data.length - 1);

    let challengeUnlocked = await this.challenger.hasUnlockedChallenge(id, this.userAddress);
    let args = {};
    if (!challengeUnlocked) {
      let price = await this.challengeManager.getKeyPrice(id);
      price = ethers.utils.formatEther(price);

      let gas = await this.challenger.estimateGas.submitData(id, +data, time, { value: ethers.utils.parseEther(price) });
      let add = gas.div(2);
      gas = gas.add(add);
      
      args = { 
        value: ethers.utils.parseEther(price), 
        gasLimit: gas 
       };
    }

     this.challenger.submitData(id, +data, time, args)

  }

  redeemPrice(id:number){
    this.challenger.receivePrice(id);
  }

}
