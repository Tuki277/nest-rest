export type AuthModuleOptions = {
  secret?: string;
};
export type Payload = {
  username: string;
  email: string;
  sub: string;
};

export type JWTDecodeValue = {
  iat: number;
  exp: number;
  iss?: string;
  aud?: string | string[];
} & Payload;
