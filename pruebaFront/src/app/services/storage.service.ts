import { Injectable } from '@angular/core';

const Storage  = localStorage;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  store( storageKey: string, value: any){ 
     Storage.setItem(storageKey,value);
  }

  get( storageKey: string){ 
    const ret = Storage.getItem(storageKey);
    if(ret){ 
      return ret;
    }else{ 
      return false;
    }
  }

  removeItem( storageKey: string){ 
     Storage.removeItem(storageKey);
  }

  clear(){ 
    Storage.clear();
  }

}
