export interface Musics extends Document {
    readonly user_id: string;
    readonly is_favourite: string;
    readonly title: string;
    readonly locations: string;
    readonly emotion_type: string;
}