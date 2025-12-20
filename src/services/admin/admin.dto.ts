export interface AdminSignInRequest {
    usernameOrEmail: string;
    password: string;
}

export interface AdminSignInResponse {
    accessToken: string;
}

