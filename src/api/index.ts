import { http } from "@/utils/http";

export type UserResult = {
  success: boolean;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** 按钮级别权限 */
    permissions: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

interface SensitiveWordsData {
  limit?: number;
  page?: number;
  keyWord?: string;
  word?: string;
  // 其他可能的属性...
}

/** 获获取取敏敏感感词 */
export const getSensitiveWords = (data?: SensitiveWordsData) => {
  return http.request<UserResult>(
    "get",
    `/api/admin/sensitiveWords?exactMatch=${data.keyWord}&page=${data.page}&limit=${data.limit}`,
    {
      data
    }
  );
};
export const getComplaints = (data?: SensitiveWordsData) => {
  return http.request<UserResult>(
    "get",
    `/api/admin/complaints/${data.keyWord}?page=${data.page}&limit=${data.limit}`,
    {
      data
    }
  );
};
export const getAgentChatMessageRecords = (data?: SensitiveWordsData) => {
  return http.request<UserResult>(
    "get",
    `/api/admin/agentChatMessageRecords/${data.keyWord}?page=${data.page}&limit=${data.limit}`,
    {
      data
    }
  );
};
export const getnoncompliances = (data?: SensitiveWordsData) => {
  return http.request<UserResult>(
    "get",
    `/api/admin/noncompliances/${data.keyWord}?page=${data.page}&limit=${3}`,
    {
      data
    }
  );
};

/** add */
export const addSensitiveWords = (data?: SensitiveWordsData) => {
  return http.request<UserResult>("post", `/api/admin/sensitiveWords/add`, {
    data
  });
};

export const removeSensitiveWords = (data?: SensitiveWordsData) => {
  return http.request<UserResult>("post", `/api/admin/sensitiveWords/remove`, {
    data
  });
};

export const disabledSensitiveWords = (data?: SensitiveWordsData) => {
  return http.request<UserResult>("post", `/api/admin/sensitiveWords/disable`, {
    data
  });
};

export const enableSensitiveWords = (data?: SensitiveWordsData) => {
  return http.request<UserResult>("post", `/api/admin/sensitiveWords/enable`, {
    data
  });
};
