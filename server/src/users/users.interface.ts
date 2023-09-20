export interface Users extends Document {
    readonly first_name: string;
    readonly last_name: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly status: string;
    readonly contact_no: string;
    readonly profile_url: string;
}
