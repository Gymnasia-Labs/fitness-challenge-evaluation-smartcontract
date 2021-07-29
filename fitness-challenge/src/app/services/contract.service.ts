import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { ethers } from 'ethers';
import { setAddress } from '../ngrx/app.actions';
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
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(this.provider);
    
    this.web3provider.enable()
      .then((address: string) => 
          this.store.dispatch(setAddress({address: address[0]}))
          );
   }

   public connectMetamask(){
    
    this.web3provider.enable()
                     .then((address: string) => 
                         this.store.dispatch(setAddress({address: address[0]}))
                         );

  }

}
