import { BrowserPlatformLocation, PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor(private platformLocation: PlatformLocation) {}

  isBrowser(): boolean {
    // Verifica se il codice è in esecuzione lato client
    return this.platformLocation instanceof BrowserPlatformLocation;
  }

  innerWidth() {
    return this.isBrowser() ?  window.innerWidth : 0;
  }

  isSM():boolean{
    return this.innerWidth() <= 480;
  }
  isMD():boolean{
    return this.innerWidth() > 480 && this.innerWidth() <= 768;
  }
  isLG():boolean{
    return this.innerWidth() > 768 && this.innerWidth() <= 1440;
  }
  isXL():boolean{
    return this.innerWidth() > 1440;
  }

  getBreakpoint():string{
    if(this.isSM()) return 'sm';
    if(this.isMD()) return 'md';
    if(this.isLG()) return 'lg';
    return 'xl';
  }
}
