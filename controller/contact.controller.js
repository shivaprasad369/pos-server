import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const upsertContact = async (req, res) => {
  const { email, phone, location } = req.body;

  if (!email || !phone || !location) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
const existed=await prisma.contact.findFirst()
    if(existed){
            await prisma.contact.update({
                where: { id: existed.id }, 
                data:{
                    email,
                    phone,
                    location
                }
            })
    }
    else{
        await prisma.contact.create({
            data:{
                email,
                phone,
                location
            }
        })
    }
  

    res.status(200).json("update suucess fully");
  } catch (error) {
    console.error('Upsert Contact Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getInfo=async(req,res)=>{
  try {
    const info = await prisma.contact.findFirst();
    res.status(200).json(info);
  } catch (error) {
    console.error("Error fetching info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
