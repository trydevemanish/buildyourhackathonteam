export type TeamCardInfoType = {
    id:string;
    leaderid:string;
    category:string;
    teamname : string;
    leadername : string;
    projectname : string;
    projectdesc : string;
    hackathonname : string;
    hackathondesc : string;
    createdAt? : string;
    lastUpdated? : string;
    maxteamsize? : number;
}

export type UserData = {
    id : string,
    name:string,
    email:string,
    role:string,
}
