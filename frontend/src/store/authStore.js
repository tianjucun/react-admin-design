import { create } from 'zustand';
import { getToken, getUserInfo, setToken, setUserInfo, removeToken } from '../utils/auth';
import * as authApi from '../api/auth';

const useAuthStore = create((set) => ({
  token: getToken(),
  userInfo: getUserInfo(),
  
  // 登录
  login: async (username, password) => {
    try {
      const result = await authApi.login(username, password);
      setToken(result.token);
      setUserInfo(result.user);
      set({ token: result.token, userInfo: result.user });
      return result;
    } catch (error) {
      throw error;
    }
  },
  
  // 获取用户信息
  fetchUserInfo: async () => {
    try {
      const userInfo = await authApi.getInfo();
      setUserInfo(userInfo);
      set({ userInfo });
      return userInfo;
    } catch (error) {
      throw error;
    }
  },
  
  // 退出登录
  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('退出登录失败:', error);
    } finally {
      removeToken();
      set({ token: null, userInfo: null });
      window.location.href = '/login';
    }
  }
}));

export default useAuthStore;

