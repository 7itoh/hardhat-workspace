/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface MarketplaceInterface extends ethers.utils.Interface {
  functions: {
    "approvers(address)": FunctionFragment;
    "approversCount()": FunctionFragment;
    "contribute()": FunctionFragment;
    "createRequest(string,uint256,address)": FunctionFragment;
    "getManager()": FunctionFragment;
    "minimumContribution()": FunctionFragment;
    "requests(uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "approvers", values: [string]): string;
  encodeFunctionData(
    functionFragment: "approversCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contribute",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createRequest",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minimumContribution",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "requests",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "approvers", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "approversCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "contribute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getManager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "minimumContribution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "requests", data: BytesLike): Result;

  events: {};
}

export class Marketplace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MarketplaceInterface;

  functions: {
    approvers(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    approversCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    contribute(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createRequest(
      _description: string,
      _value: BigNumberish,
      _recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getManager(overrides?: CallOverrides): Promise<[string]>;

    minimumContribution(overrides?: CallOverrides): Promise<[BigNumber]>;

    requests(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, boolean, BigNumber] & {
        description: string;
        value: BigNumber;
        recipient: string;
        complete: boolean;
        approvalsCount: BigNumber;
      }
    >;
  };

  approvers(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  approversCount(overrides?: CallOverrides): Promise<BigNumber>;

  contribute(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createRequest(
    _description: string,
    _value: BigNumberish,
    _recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getManager(overrides?: CallOverrides): Promise<string>;

  minimumContribution(overrides?: CallOverrides): Promise<BigNumber>;

  requests(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string, boolean, BigNumber] & {
      description: string;
      value: BigNumber;
      recipient: string;
      complete: boolean;
      approvalsCount: BigNumber;
    }
  >;

  callStatic: {
    approvers(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    approversCount(overrides?: CallOverrides): Promise<BigNumber>;

    contribute(overrides?: CallOverrides): Promise<void>;

    createRequest(
      _description: string,
      _value: BigNumberish,
      _recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getManager(overrides?: CallOverrides): Promise<string>;

    minimumContribution(overrides?: CallOverrides): Promise<BigNumber>;

    requests(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, boolean, BigNumber] & {
        description: string;
        value: BigNumber;
        recipient: string;
        complete: boolean;
        approvalsCount: BigNumber;
      }
    >;
  };

  filters: {};

  estimateGas: {
    approvers(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    approversCount(overrides?: CallOverrides): Promise<BigNumber>;

    contribute(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createRequest(
      _description: string,
      _value: BigNumberish,
      _recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getManager(overrides?: CallOverrides): Promise<BigNumber>;

    minimumContribution(overrides?: CallOverrides): Promise<BigNumber>;

    requests(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    approvers(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approversCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    contribute(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createRequest(
      _description: string,
      _value: BigNumberish,
      _recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minimumContribution(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    requests(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
