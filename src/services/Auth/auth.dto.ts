export interface SignInRequest {
    usernameOrEmail: string;
    password: string;
}

export interface SignInResponse {
    accessToken: string;
}
