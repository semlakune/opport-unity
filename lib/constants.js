import {
  BookmarkIcon,
  CheckCircledIcon,
  DashboardIcon,
  ListBulletIcon,
  MixerHorizontalIcon,
  PersonIcon
} from "@radix-ui/react-icons";

export const menu = [
  {
    name: "Dashboard",
    icon: <DashboardIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard",
    user: ["EMPLOYER", "USER"],
    description: "Dashboard"
  },
  {
    name: "My Jobs",
    icon: <ListBulletIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/my-jobs",
    user: ["EMPLOYER"],
    description: "Manage your jobs"
  },
  {
    name: "Candidates",
    icon: <PersonIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/candidates",
    user: ["EMPLOYER"]
  },
  {
    name: "Saved Jobs",
    icon: <BookmarkIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/saved-jobs",
    user: ["USER"],
    description: "Manage your saved jobs"
  },
  {
    name: "Applied Jobs",
    icon: <CheckCircledIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/applied-jobs",
    user: ["USER"],
    description: "Manage your applied jobs"
  },
  {
    name: "Settings",
    icon: <MixerHorizontalIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/account-settings",
    user: ["EMPLOYER", "USER"],
    description: "Update your password"
  },
  {
    name: "Create Job",
    href: "/dashboard/my-jobs/create",
    user: ["EMPLOYER"],
    description: "Create a new job"
  }
]

export const miniMenu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    user: ["EMPLOYER", "USER"],
  },
  {
    name: "Settings",
    href: "/dashboard/account-settings",
    user: ["EMPLOYER", "USER"],
  },
]

export const jobLevel = [
  {
    name: "Entry Level",
    value: "ENTRY_LEVEL",
  },
  {
    name: "Mid Level",
    value: "MID_LEVEL",
  },
  {
    name: "Senior Level",
    value: "SENIOR_LEVEL",
  },
]

export const jobType = [
  {
    name: "Full Time",
    value: "FULL_TIME",
  },
  {
    name: "Part Time",
    value: "PART_TIME",
  },
  {
    name: "Contract",
    value: "CONTRACT",
  },
  {
    name: "Internship",
    value: "INTERNSHIP",
  },
]

export const workModel = [
  {
    name: "Remote",
    value: "REMOTE",
  },
  {
    name: "On Site",
    value: "ON_SITE",
  },
  {
    name: "Hybrid",
    value: "HYBRID",
  },
]

export const jobsFilter = [
  {
    title: "Job Type",
    id: "type",
    data: jobType,
  },
  {
    title: "Work Model",
    id: "workModel",
    data: workModel,
  },
  {
    title: "Job Level",
    id: "level",
    data: jobLevel,
  },
]

export const sortOptions = [
  {
    name: "Newest",
    value: "NEWEST",
  },
  {
    name: "Oldest",
    value: "OLDEST",
  },
  {
    name: "Highest Salary",
    value: "HIGHEST_SALARY",
  },
  {
    name: "Lowest Salary",
    value: "LOWEST_SALARY",
  },
]