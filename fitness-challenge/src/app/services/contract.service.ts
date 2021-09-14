import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { ethers, utils } from 'ethers';
import { fetchChallenges, setAddress, setChallenges } from '../ngrx/app.actions';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Challenge } from '../models/challenge';

declare const window: any;

export const WEB3PROVIDER = new InjectionToken('Web3 provider', {
  providedIn: 'root',
  factory: () => (window as any).ethereum
});

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
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(this.provider);

      this.web3provider.enable()
        .then((address: string) =>{
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
    // this.getChallenges().then(challenges => this.store.dispatch(setChallenges({ challenges : challenges })));
    this.store.dispatch({ type: fetchChallenges });
  }

  public createChallenge(
    title: string,
    description: string,
    start: number,
    end: number,
    participantsCount: number,
    price: number
  ): Observable<boolean> {
    return this.challengeManager.createChallenge(title, description, start, end, participantsCount, price, this.userAddress);
  }

  public getChallenges(): Promise<Challenge[]> {
    return this.challengeManager.getAllChallenges();
  }

  public submitChallenge(id: number, data: string, time: number) {
    data = data.substring(0, data.length - 1)
    console.log(data);
    
    this.challenger.submitData(id, +data, time);
  }

}
