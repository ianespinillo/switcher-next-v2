import { db } from "./utils/prisma"

export const competitionsPerVersion = async () => {
    const versions= await db.version.findMany({
        select:{
            id: true,
            free_release: true,
            competitions:{
                select:{
                    name: true
                }
            }
        }
    })
    console.log(versions    )
}