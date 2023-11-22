import {
  AvatarIcon,
  BackpackIcon,
  BookmarkIcon,
  CheckCircledIcon,
  DashboardIcon, ListBulletIcon,
  MixerHorizontalIcon,
  PersonIcon
} from "@radix-ui/react-icons";

export const categories = [
  {
    name: "Development",
    value: "development",
  },
  {
    name: "Data",
    value: "data",
  },
  {
    name: "Accounting",
    value: "accounting",
  },
  {
    name: "Design",
    value: "design",
  },
  {
    name: "Marketing",
    value: "marketing",
  },
  {
    name: "Writer",
    value: "writer",
  },
  {
    name: "Product",
    value: "product",
  },
]
export const jobTypes = [
  {
    name: "Full Time",
    value: "full-time",
  },
  {
    name: "Part Time",
    value: "part-time",
  },
  {
    name: "Freelance",
    value: "freelance",
  },
  {
    name: "Internship",
    value: "internship",
  },
  {
    name: "Temporary",
    value: "temporary",
  },
]
export const workSystems = [
  {
    name: "Remote",
    value: "remote",
  },
  {
    name: "On Site",
    value: "on-site",
  },
  {
    name: "Hybrid",
    value: "hybrid",
  },
]

export const menu = [
  {
    name: "Dashboard",
    icon: <DashboardIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard",
    user: ["EMPLOYER", "USER"],
  },
  {
    name: "Profile",
    icon: <AvatarIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/profile",
    user: ["USER"]
  },
  {
    name: "Company Profile",
    icon: <BackpackIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/company-profile",
    user: ["EMPLOYER"]
  },
  {
    name: "My Jobs",
    icon: <ListBulletIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/my-jobs",
    user: ["EMPLOYER"]
  },
  {
    name: "Account Settings",
    icon: <MixerHorizontalIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/account-settings",
    user: ["EMPLOYER", "USER"]
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
    user: ["USER"]
  },
  {
    name: "Applied Jobs",
    icon: <CheckCircledIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/applied-jobs",
    user: ["USER"]
  }
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