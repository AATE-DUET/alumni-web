import config from "../../config";
import { authService } from "../auth/auth.service";
import {
  ApproveMembersPayload,
  MemberResponse,
  MembersListParams,
  MembersResponse,
} from "./@types/members";
import { HttpAuthService } from "./httpService/httpAuth.service";

class MembersAPI {
  constructor(private http: HttpAuthService) {}

  activeMembersList(params?: MembersListParams) {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", params?.limit?.toString() ?? "20");
    queryParams.append("page", params?.page?.toString() ?? "1");
    if (params?.name) queryParams.append("name", params?.name);
    if (params?.batch) queryParams.append("batch", params?.batch);
    if (params?.company_name)
      queryParams.append("company_name", params?.company_name);
    if (params?.designation)
      queryParams.append("designation", params?.designation);
    if (params?.location) queryParams.append("location", params?.location);
    if (params?.occupation_type)
      queryParams.append("occupation_type", params?.occupation_type.toString());
    if (params?.student_id)
      queryParams.append("student_id", params?.student_id.toString());
    if (params?.ordering)
      queryParams.append("ordering", params?.ordering.toString());

    if (params?.employment_status)
      queryParams?.append(
        "employment_status",
        params?.employment_status?.toString()
      );
    if (params?.job_department)
      queryParams.append("job_department", params?.job_department.toString());
    if (params?.skills) queryParams.append("skills", params?.skills.toString());

    return this.http.get<MembersResponse>(
      `api/v1/users/all-members/?${queryParams}`
    );
  }

  pendingMembersList(params?: MembersListParams) {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", params?.limit?.toString() ?? "10");
    queryParams.append("page", params?.page?.toString() ?? "1");
    return this.http.get<MembersResponse>(
      `api/v1/users/pending-members/?${queryParams}`
    );
  }

  getMemberDetails(ID: string | number) {
    return this.http.get<MemberResponse>(`api/v1/users/all-members/${ID}/`);
  }

  approveMembers(payload: ApproveMembersPayload) {
    return this.http.post("api/v1/users/pending-members/", payload);
  }

  updateMemberRole(payload: ApproveMembersPayload) {
    return this.http.post(`api/v1/users/manage-role/`, payload);
  }
}
const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const membersAPI = new MembersAPI(httpAuthService);
