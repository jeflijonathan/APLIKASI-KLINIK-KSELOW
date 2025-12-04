export type LoginRequestModel = {
  identifier: string;
  password: string;
};

export type LoginResponseModel = {
  id: string;
  username: string;
  email: string;
  role: string;
  token: string;
};
