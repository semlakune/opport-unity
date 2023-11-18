import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {NextResponse} from "next/server";
import prisma from "@/db/prisma";

const s3Client = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DO_SPACES_ACCESS_KEY, // Use environment variables to store keys
    secretAccessKey: process.env.DO_SPACES_SECRET_KEY,
  },
  region: process.env.DO_SPACES_REGION,
});

const uploadFileToSpace = async (file, fileName, mimeType) => {
  const params = {
    Bucket: process.env.DO_SPACES_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ACL: "public-read",
    ContentType: mimeType,
  }

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("Success", data);
    // Return the file URL
    const url = `https://${process.env.DO_SPACES_BUCKET_NAME}.nyc3.cdn.digitaloceanspaces.com/${fileName}`
    return url
  } catch (err) {
    console.log("Error", err);
    return null;
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file")
    const username = formData.get("username")
    const userType = formData.get("userType")
    const userId = formData.get("userId")

    const numericUserId = Number(userId);

    if (!file) {
      return NextResponse.json({ error: "File is required", status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileExtension = file.name.split(".")?.slice(-1)[0]
    const fileName = `${username}.${fileExtension}`

    const url = await uploadFileToSpace(buffer, fileName, file.type)

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
