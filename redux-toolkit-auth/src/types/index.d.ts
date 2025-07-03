declare type GlobalState = {
  token: string,
  user: User | null;
};

declare type HealthCheck = {
  "API Version": string;
  "Postgres Service": string;
  "Vapi Service": string;
};

declare type RegisterUser = {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  profile_picture?: string,
}

declare type LoginUser = {
  email: string,
  password: string,
}

declare type PostLoginResponse = {
  data: {
    data: {
      token: string;
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      profile_picture?: string;
    };
  };
};

declare type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture?: string;
}