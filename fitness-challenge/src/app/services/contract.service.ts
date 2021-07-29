import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { ethers, utils } from 'ethers';
import { setAddress } from '../ngrx/app.actions';
import WalletConnectProvider from "@walletconnect/web3-provider";

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
  public resContract: any;
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
          this.store.dispatch(setAddress({address: address[0]}))
          );
        } else {
          alert('please install metamask provider and then reload this page')
        }
   }

   public async connectMetamask(){
    
    // this.web3provider.enable()
    //                  .then((address: string) => 
    //                      this.store.dispatch(setAddress({address: address[0]}))
    //                      );

    const provider = new WalletConnectProvider({
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    });
    await provider.enable();

  }

}
