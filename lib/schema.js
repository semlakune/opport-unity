import { z } from 'zod';

// Define enums for JobLevel, JobType, and WorkModel as they are used in the Job model.
const JobLevel = z.enum(['ENTRY_LEVEL', 'MID_LEVEL', 'SENIOR_LEVEL']);
const JobType = z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP']);
const WorkModel = z.enum(['REMOTE', 'ON_SITE', 'HYBRID']);

// Define the Zod schema for Job.
const JobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  salaryRange: z.string().min(1, "Salary range is required"),
  level: JobLevel,
  type: JobType,
  workModel: WorkModel,
  categoryId: z.number().int().nonnegative().int().positive("Category is required"),
  qualifications: z.array(z.string().min(1, "Each qualification must be a non-empty string")).nonempty("Qualifications must not be empty"),
  responsibilities: z.array(z.string().min(1, "Each responsibility must be a non-empty string")).nonempty("Responsibilities must not be empty"),
  employerId: z.number().int().positive("Employer ID is required"),
});

const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .regex(/^[a-zA-Z0-9]*$/, { message: "Username must be alphanumeric." }),
  password: z.string()
    .min(5, { message: "Password must be at least 5 characters long." }),
  userType: z.string().min(4, { message: "Please choose your role" }),
})

export { JobSchema, RegisterSchema };