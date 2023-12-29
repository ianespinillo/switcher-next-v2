import prisma from '@/lib/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const countries = await prisma.country.findMany()
    return res.status(200).json({
      ok: true,
      countries: countries
    })
  } else if (req.method === 'POST') {
    const { countryName, countryAbrev, confedName, imgUrl, imgWithoutName } =
      req.json()
    try {
      const newCountry = await prisma.country.create({
        data: {
          name: countryName,
          country_3: countryAbrev,
          country_img_url: imgUrl,
          confederation_id: confedName,
          country_not_name_img: imgWithoutName
        }
      })
      if (newCountry) {
        return res.status(200).json({
          ok: true,
          data: newCountry
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
