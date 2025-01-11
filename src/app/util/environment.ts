class Enviroment {
  constructor() {}

  isDev() {
    return process.env.NODE_ENV === 'development';
  }

  isProd() {
    return process.env.NODE_ENV === 'production';
  }
}

export const Env = new Enviroment();
