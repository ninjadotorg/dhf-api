import { User } from '../../models/User';

export class AuthResponse {
    public token: string;
    public expired: number;
    public user: User;
}
