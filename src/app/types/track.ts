export interface Track {
    id: number,
    title: string,
    duration: number,
    filePath: string,
    createdAt: Date,
    streamUrl: string,
    blobUrl?: string | null;
}