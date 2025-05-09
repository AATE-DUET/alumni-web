export interface PostPayload {
  category?: string | number;
  title?: string;
  body?: string;
  attachments?: string[];
}

export interface PostsResponse {
  meta_data: {
    count?: number;
    page_size: number;
    next: number;
    previous: number;
    page: number;
  };
  data?: PostsDetails[];
}

export type PostsDetails = {
  id?: string | number;
  created_at: Date | string;
  category?: {
    id: number | string;
    name?: string;
  };
  title?: string;
  body: string;
  attachments?: string[];
  total_comments?: number;
  user?: {
    id?: string | number;
    name?: string;
    user?: string;
    email?: string;
    profile_pic?: string;
  };
  comments?: [
    {
      id: number;
      comment: string;
      user: User;
      created_at: Date | string;
    }
  ];
};

export interface PostResponse {
  data: PostsDetails;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  profile_pic: string;
}

export interface CommentPayload {
  post?: string | number;
  comment?: string;
}

export interface CommentResponse {
  data?: {
    id?: string | number;
    comment?: string;
    post?: string | number;
    user?: {
      id?: string | number;
      name?: string;
      username?: string;
      email?: string;
      profile_pic?: string;
    };
  };
}

export interface DeleteCommentPayload {
  comment_id?: string | number;
  is_active?: boolean;
}

export interface PostSearchPayload {
  value?: string;
}

export interface PostListParams {
  id?: string;
  limit?: string;
  page?: string;
  search?: string;
  category?: string;
}
