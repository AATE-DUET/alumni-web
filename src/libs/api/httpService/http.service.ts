import { ErrorException } from "../../../utils/index";
import {
  HttpServiceConfig,
  RefreshTokenResponse,
  RequestBody,
  RequestOptions,
} from "./types";

export class HttpService {
  constructor(
    private baseURL: string,
    private config: HttpServiceConfig = {}
  ) {}

  get<T>(url: string, options?: RequestOptions) {
    return this.request<T>("GET", url, null, options);
  }

  post<T>(url: string, body: unknown, options?: RequestOptions) {
    return this.request<T>("POST", url, JSON.stringify(body), options);
  }

  put<T>(url: string, body: unknown, options?: RequestOptions) {
    return this.request<T>("PUT", url, JSON.stringify(body), options);
  }

  patch<T>(url: string, body: unknown, options?: RequestOptions) {
    return this.request<T>("PATCH", url, JSON.stringify(body), options);
  }

  delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>("DELETE", url, null, options);
  }

  upload<T>(url: string, formData: FormData, options?: RequestOptions) {
    return this.request<T>("POST", url, formData, options);
  }

  private async refreshToken() {
    const refreshToken = this.config.getRefreshToken?.();
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseURL}/refresh`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (response.ok) {
        const data = (await response.json()) as RefreshTokenResponse;
        const { access_token } = data;
        if (access_token) {
          this.config.onUpdateToken?.(access_token);
          return access_token;
        }

        throw new Error("Something went wrong");
      }

      throw new Error("Something went wrong");
    } catch (error) {
      return null;
    }
  }

  private async request<T>(
    method: string,
    url: string,
    body: RequestBody,
    options?: RequestOptions
  ): Promise<T> {
    const requestURL = `${this.baseURL}/${url}`;

    // Request headers
    const token = this.config.getToken?.();
    const headers: RequestOptions["headers"] = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (body instanceof FormData) {
      delete headers["content-type"];
    }

    // Send request
    try {
      const response = await fetch(requestURL, {
        method,
        headers,
        body,
      });

      if (response.ok) {
        try {
          return await response.json();
        } catch (error) {
          return {} as T;
        }
      }

      // Unauthorised
      // Create new access token using refresh token
      if (response.status === 401) {
        const newToken = await this.refreshToken();
        if (newToken) {
          return this.request<T>(method, url, body, options);
        }

        this.config.onUnauthorised?.();
      }

      const error = await response.json();
      throw new ErrorException(error || "Something went wrong");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error?.message || "Something went wrong");
      }

      throw new Error("Something went wrong");
    }
  }
}
