import { USER_INFO_STORAGE_KEY, VACATION_INFO_STORAGE_KEY } from "@/constant";
import { IAtom, IUserInfo } from "@/types";
import Taro from "@tarojs/taro";

export const isNil = (value: any): boolean =>
  [null, undefined, NaN, {}].includes(value);

export const getBase64 = async (url: string): Promise<string> =>
  new Promise(resolve => {
    Taro.getFileSystemManager().readFile({
      filePath: url,
      encoding: "base64",
      success: res => {
        resolve("data:image/png;base64," + res.data);
      }
    });
  });

export const updateUserInfo = (userInfo: IUserInfo): Promise<boolean> =>
  new Promise<boolean>(resolve => {
    Taro.setStorage({
      key: USER_INFO_STORAGE_KEY,
      data: userInfo,
      success: () => resolve(true),
      fail: () => resolve(false)
    });
  });

export const getUserInfo = (): Promise<IUserInfo | boolean> =>
  new Promise<IUserInfo | boolean>(resolve => {
    Taro.getStorage({
      key: USER_INFO_STORAGE_KEY,
      success: result => {
        resolve(result.data);
      },
      fail: () => {
        resolve(false);
      }
    });
  });

export const clearUserInfo = () =>
  new Promise<boolean>(resolve => {
    Taro.clearStorage({
      success: () => {
        resolve(true);
      },
      fail: () => {
        resolve(false);
      }
    });
  });

export const getVacationList = (): Promise<IAtom[]> =>
  new Promise<IAtom[]>(resolve => {
    Taro.getStorage({
      key: VACATION_INFO_STORAGE_KEY,
      success: result => {
        resolve(result.data);
      },
      fail: () => resolve([])
    });
  });

export const pushVacationList = async (
  atomInfo: IAtom
): Promise<IAtom[] | boolean> => {
  const list = [atomInfo, ...(await getVacationList())];
  return new Promise<IAtom[] | boolean>(resolve => {
    Taro.setStorage({
      key: VACATION_INFO_STORAGE_KEY,
      data: list,
      success: () => resolve(list),
      fail: () => resolve(false)
    });
  });
};
