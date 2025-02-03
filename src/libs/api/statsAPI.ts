import config from "../../config";
import { authService } from "../auth";
import { StatsData } from "./@types/stats";
import { HttpAuthService } from "./httpService/httpAuth.service";

class Stats {
  constructor(private http: HttpAuthService) {}

  getStats() {
    return this.http.get<StatsData>(
      "api/v1/users/stats/"
    );
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const statsAPI = new Stats(
  httpAuthService
);
