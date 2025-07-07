declare type GlobalState = {
  token: string,
  user: {
    id: number,
    username: string,
    email: string,
    image: string,
  },
};

declare type AppTheme = 'light' | 'dark' | 'system';

declare type ThemeState = {
  theme: AppTheme,
};

declare type HealthCheck = {
  "API Version": string;
  "Postgres Service": string;
  "Vapi Service": string;
};

declare type RegisterUserT = {
  username: string,
  email: string,
  password: string,
};

declare type LoginUserT = {
  email: string,
  password: string,
};

declare type PostLoginResponse = {
  data: {
    access: string,
    data: {
      user: {
        id: number,
        username: string,
        email: string,
        image: string,
      }
    }
  };
};

declare type User = {
  id: number;
  username: string,
  email: string,
  image: string,
};

declare type ShoppingT = {
  id: number,
  product_name: string,
  quantity: string,
  unit: string,
  category: string,
};
