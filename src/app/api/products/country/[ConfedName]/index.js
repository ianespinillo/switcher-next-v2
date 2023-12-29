import prisma from "@/lib/db"

export default async function handler(req, res) {
    const {ConfedName} = req.query
    console.log(ConfedName)
    if(ConfedName){
        const confed= await prisma.confederation.findUnique({
            where:{
                confed_3: ConfedName
            }
        })
        if(confed){
            const confedCountries= await prisma.country.findMany({
                where: {
                    confederation_id: confed.id
                }
            })
            res.status(200).json({
                ok: true,
                countries: confedCountries
            })
        }
    }
}