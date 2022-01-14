export type CONTRACTADDRESS = string;
export type ABI = any;

export interface WEBTHREEAPITYPES {
  provider: any | null,
  web3: any | null
}
export type CALLCONTRACTMETHOD = any;
export type SENDCONTRACTMETHOD = any;
export interface CALLSENDMETHOD {
  callContract: CALLCONTRACTMETHOD;
  sendContract: SENDCONTRACTMETHOD;
}

export type CONTRACTSLISTTYPE = string[]
export interface USECONTRACTLIST {
  contractsList: CONTRACTSLISTTYPE
}

export type MINIMUM = string;
export type BALANCE = string;
export type REQUEST = [];
export type APPROVERSCOUNT = number;
export type ADDRESS = string;
export type REQUESTCOUNT = number;
export interface INFOCREATECONTRACT {
  minimum: MINIMUM;
  balance: BALANCE;
  request: REQUEST;
  approversCount: APPROVERSCOUNT;
  managerAddress: ADDRESS;
  requestCount: REQUESTCOUNT;
}

export type SIGNER = any;
export type PROVIDER = any;
export type WEB3 = any;
export interface WEB3API {
  provider: PROVIDER;
  web3: WEB3;
}

export interface REQUESTTYPES { 
  index: number;
  description: string;
  value: string;
  recipient: string;
  approversCount: string;
}
export interface FETCHREQUESTLIST {
  requestListItems: REQUESTTYPES[]
}

export type USERADDRESS = string;
export interface USERADDRESSTYPES {
  userAddress: USERADDRESS;
}

export type AMOUNT = string;
export type RESULTMESSAGE = string;
export interface CREATENEWCONTRACT {
  resultMessage: RESULTMESSAGE;
  addCreateContract: () => Promise<void>
}