export interface Captures extends Document {
    readonly user_id: string;
    readonly date: Date;
    readonly expression: string;
    readonly capture_url: string;
}
