interface post {
    id: number;
    title: string;
    body: string;
    publishStartTime: Date?;
    isDraft: boolean;
    tags: Array<string>;
}