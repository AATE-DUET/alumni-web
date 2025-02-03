import config from "../../config";
import { authService } from "../auth/auth.service";
import { GetLists, SearchQuery } from "./@types/search";
import { HttpAuthService } from "./httpService/httpAuth.service";

class BatchAPI {
  constructor(private http: HttpAuthService) {}
  getBatchList() {
    return this.http.get<GetLists>("api/v1/core/public/batches/?limit=200");
  }

  getOccupationList() {
    return this.http.get<GetLists>("api/v1/core/public/occupations/");
  }

  getJobDepartment(params?: SearchQuery) {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params?.search.toString());
    return this.http.get<GetLists>(
      `api/v1/core/public/job-departments/?${queryParams}`
    );
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const searchAPI = new BatchAPI(httpAuthService);
