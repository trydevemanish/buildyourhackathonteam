import { z } from 'zod'

export const TeamFormationSchema = z.object({
    teamname: z.string(),
    projectname:z.string(),
    projectdesc:z.string().max(500),
    hackathonname:z.string(),
    hackathondesc:z.string().max(500)
})