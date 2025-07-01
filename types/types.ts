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
    teamstatus? : string;
}

export type UserData = {
    id : string,
    name:string,
    email:string,
    role:string,
}

export type teamCreatedData = {
    id:string;
    teamname:string;
    projectname:string;
    category:string;
}

export type WholeUserdata = {
    id:string;
    name:string;
    bio:string;
    createdAt:string;
    github:string;
    linkedin:string;
    email:string;
    role:string;
    teamcreated : [teamCreatedData],
    teamjoined : [
        length : number,
    ];
}

export type TeamJoinedByUserDetail = {
    joinedAt:string,
    team : {
        id:string,
        teamname : string,
        leadername :string,
        projectname:string,
        projectdesc : string,
        hackathonname : string;
        hackathondesc:string
    }
}

export type teamCreatedAttributeNamenType = {
   attribute : string;
   className:string;
}