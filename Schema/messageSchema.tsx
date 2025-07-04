import { z } from "zod"
import { Timestamp } from "firebase/firestore"

const messageSchema = z.object({
  teamid: z.string(),
  message: z.string().min(1),
  sendername: z.string(),
  timestamp: z.instanceof(Timestamp),
})

export {
  messageSchema
}