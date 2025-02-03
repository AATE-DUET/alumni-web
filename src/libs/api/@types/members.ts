export interface MembersResponse {
  data?: MemberDetails[];
  meta_data?: {
    page_size?: number;
    next?: string;
    count?: number;
  };
}

export type MemberDetails = {
  id?: number;
  batch?: Batch;
  occupation_type?: OccupationType;
  profile_pic?: string;
  last_login?: string;
  is_superuser?: boolean;
  username?: string;
  name?: string;
  email?: string;
  role?: string;
  is_email_verified?: boolean;
  phone?: string;
  professional_designation?: string;
  batch_no?: number;
  employment_status?: string;
  unemployment_reasons?: string;
  student_id?: string;
  passing_year?: number;
  expertise_area?: string;
  contact_details?: string;
  is_active?: boolean;
  experiences?: Experience[];
  user_id?: string;
};

export interface MemberResponse {
  data?: {
    id?: number;
    batch?: Batch;
    occupation_type?: OccupationType;
    profile_pic?: string;
    last_login?: string;
    is_superuser?: boolean;
    username?: string;
    name?: string;
    email?: string;
    is_email_verified?: boolean;
    phone?: string;
    professional_designation?: string;
    batch_no?: number;
    employment_status?: string;
    unemployment_reasons?: string;
    student_id?: string;
    passing_year?: number;
    expertise_area?: string;
    contact_details?: string;
    is_active?: boolean;
    experiences?: Experience[];
  };
}

export interface Batch {
  id?: number | string;
  name?: string;
  batch_number?: number;
}

export interface OccupationType {
  id?: number | string;
  name?: string;
}

export interface Experience {
  id?: string | number;
  designation?: string;
  company_name?: string;
  working_years?: number;
  job_location?: string;
  job_department?: JobDepartment;
  responsibilities?: string;
  start?: string;
  end?: string;
}

export interface JobDepartment {
  id?: string | number;
  name?: string;
}

export interface ApproveMembersPayload {
  user_id?: number;
  role?: string;
}

export interface MembersListParams {
  ordering?: number | string;
  name?: string;
  designation?: string;
  phone?: string;
  batch?: string;
  occupation_type?: number | string;
  employment_status?: string;
  student_id?: string | number;
  location?: string;
  company_name?: string;
  job_department?: string;
  skills?: string;
  limit?: number;
  page?: number;
}

export interface CommitteeID {
  id?: string;
}
