import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { ethers, utils } from 'ethers';
import { setAddress } from '../ngrx/app.actions';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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
  public contract: any;
  public provider: any;

  constructor(
    @Inject(WEB3PROVIDER) public web3provider: any,
    private store: Store
  ) {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(this.provider);

      this.web3provider.enable()
        .then((address: string) =>
          this.store.dispatch(setAddress({ address: address[0] }))
        );
    }
    this.connectContract(this.provider);



  }

  public async connectMetamask() {

    const provider = new WalletConnectProvider({
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    });
    provider.on("accountsChanged", (accounts: string[]) => {
      this.store.dispatch(setAddress({ address: accounts[0] }))
    });
    provider.enable();

    this.connectContract(provider);
  }

  private connectContract(provider: any) {

    this.contract = new ethers.Contract(environment.contractAdress, environment.contractAbi, provider);
    this.contract = this.contract.connect(provider.getSigner());
  }

  public createChallenge(
    title: string,
    description: string,
    start: number,
    end: number,
    participantsCount: number,
    price: number
  ): Observable<boolean> {
    return this.contract.createChallenge(title, description, start, end, participantsCount, price);
  }

}
