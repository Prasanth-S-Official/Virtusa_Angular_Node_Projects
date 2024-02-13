export class CricketTournament {
    userId: string; // Assuming userId is a string, adjust the type accordingly
    tournamentId?: string; // tournamentId is optional as it will be generated on the server
    tournamentName: string;
    startDate: Date;
    endDate: Date;
    location: string;
    prize: string;
    rules: string;
    coverImage: string;
}