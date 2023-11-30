import { NextResponse } from "next/server";
import { exclude } from "@/lib/utils";
import prisma from "@/lib/db";
import {DeleteObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

export const runtime = 'edge'
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) throw new Error("Wrong credentials!");
    let userData = null;

    if (user.userType === "USER") {
      userData = await prisma.user.findUnique({
        where: { id: user.id },
        include: { profile: true },
      });
    } else if (user.userType === "EMPLOYER") {
      userData = await prisma.user.findUnique({
        where: { id: user.id },
        include: { employer: true },
      });
    }

    userData = exclude(userData, ["password, createdAt, updatedAt"]);

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(request) {
  try {
    let url = null
    const formData = await request.formData();
    const username = formData.get("username");
    const file = formData.get("file");
    const name = formData.get("name");

    let user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: { profile: true, employer: true }
    });

    if (!user) throw new Error("Wrong credentials!");

    const fileNameToDelete = user.userType === 'USER' ? user.profile.photo?.split("/").slice(-1)[0] : user.employer.logo?.split("/").slice(-1)[0]
    const isDeleteFileExist = user.userType === 'USER' ? user.profile?.photo : user.employer?.logo

    if (file === "DELETE_LOGO") {
      url = null
      await deleteFileFromSpace(fileNameToDelete)
    } else if (file === "DO_NOT_CHANGE") {
      url = user.userType === 'USER' ? user.profile.photo : user.employer.logo
    } else {
      const buffer = Buffer.from(await file.arrayBuffer())
      const fileExtension = file.name.split(".")?.slice(-1)[0]
      const fileName = `${username}-${new Date().getTime()}.${fileExtension}`

      url = await uploadFileToSpace(buffer, fileName, file.type)
      if (isDeleteFileExist) await deleteFileFromSpace(fileNameToDelete)
    }

    if (user.userType === 'USER') {
      await prisma.userProfile.update({
        where: { userId: user.id },
        data: { photo: url }
      });
    } else if (user.userType === 'EMPLOYER') {
      await prisma.employer.update({
        where: { userId: user.id },
        data: { logo: url }
      });
    }

    const update = await prisma.user.update({
      where: { username },
      data: { name },
    })

    const updatedUser = await prisma.user.findUnique({
      where: { id: update.id },
      select: {
        id: true,
        username: true,
        name: true,
        userType: true,
        employerId: true,
        profile: {
          select: {
            photo: true
          }
        },
        employer: {
          select: {
            logo: true
          }
        }
      }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}

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
    return `https://${process.env.DO_SPACES_BUCKET_NAME}.nyc3.cdn.digitaloceanspaces.com/${fileName}`;
  } catch (err) {
    console.log("Error", err);
    return null;
  }
}

const deleteFileFromSpace = async (fileName) => {
  const params = {
    Bucket: process.env.DO_SPACES_BUCKET_NAME,
    Key: fileName,
  }

  try {
    const data = await s3Client.send(new DeleteObjectCommand(params));
    console.log("Success", data);
    // Return the file URL
    return `https://${process.env.DO_SPACES_BUCKET_NAME}.nyc3.cdn.digitaloceanspaces.com/${fileName}`;
  } catch (err) {
    console.log("Error", err);
    return null;
  }
}