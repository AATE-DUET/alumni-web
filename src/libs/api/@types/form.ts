export interface CreatePostInputType {
  body?: string;
  category?: string | number;
  title?: string;
  attachments: string[];
}
