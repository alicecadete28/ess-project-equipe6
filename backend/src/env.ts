export default class Env {
  public static ENV = process.env.ENV || 'DEV';
  public static PORT = process.env.PORT || 5001;
  public static HOST = process.env.HOST || 'localhost';
  public static JWT_SECRET = process.env.JWT_SECRET || 'secret';
}
