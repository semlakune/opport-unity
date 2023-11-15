import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {NextResponse} from "next/server";
import {prisma} from "@/lib/utils";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFileToS3 = async (buffer, fileName) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Body: buffer,
    ContentType: "image/jpg"
  }

  const command = new PutObjectCommand(params)
  await s3Client.send(command)

  const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;

  return imageUrl
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file")
    const username = formData.get("username")
    const userType = formData.get("userType")
    const userId = formData.get("userId")

    const numericUserId = Number(userId);
    console.log(`Converted userId to number:`, numericUserId); // This should log an integer value.


    if (!file) {
      return NextResponse.json({ error: "File is required", status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileExtension = file.name.split(".")?.slice(-1)[0]
    const fileName = `${username}.${fileExtension}`
    const url = await uploadFileToS3(buffer, fileName)

    if (userType === 'USER') {
      await prisma.userProfile.update({
        where: { userId: numericUserId }, // Assuming 'userId' is the field used to connect UserProfile to User.
        data: { photo: url }
      });
    } else if (userType === 'EMPLOYER') {
      await prisma.employer.update({
        where: { userId: numericUserId }, // Assuming 'userId' is the field used to connect Employer to User.
        data: { logo: url }
      });
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: `Upload failed!: ${error}` })
  }
}
