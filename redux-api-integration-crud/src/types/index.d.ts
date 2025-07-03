declare type GlobalState = {
  todo: {
    id: string,
    title: string,
    description: string,
  },
};

declare type HealthCheck = {
  "API Version": string;
  "Postgres Service": string;
  "Vapi Service": string;
};

declare type Todo = {
  id: string,
  title: string,
  description: string,
}