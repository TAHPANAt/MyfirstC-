export interface RegisterDto {
    firstname: string;
    lastname: string;
    gmail: string;
    phone: string;
    password: string;
}

export interface LoginDto {
    gmail: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        firstname: string;
        lastname: string;
        gmail: string;
        name?: string;
        role?: string;
    };
}
