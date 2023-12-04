import {GitHubLogoIcon, LinkedInLogoIcon} from "@radix-ui/react-icons";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className={"py-20"}>
      <div className={"container"}>
        <div className={"flex flex-wrap gap-0 lg:gap-10 flex-col lg:flex-row"}>
          <div className={"flex-grow basis-60 md:basis-56"}>
            <div className={"flex items-center gap-1"}>
              <div className={"dot-bottom w-6 h-6 bg-[#98cb4c] rounded-full animate-pulse"}></div>
              <h1 className={"text-2xl"}>pportUnity</h1>
            </div>
            <p className={"text-slate-500 my-4"}>Find your job without any hassle.</p>
            <div className={"flex gap-4 mt-10"}>
              <Link href={"https://www.linkedin.com/in/ajipurnomo"} target={"_blank"}>
                  <LinkedInLogoIcon className={"text-slate-500 cursor-pointer hover:text-primary transition-all duration-500 ease-in-out"} />
              </Link>
              <Link href={"https://github.com/semlakune"} target={"_blank"}>
                  <GitHubLogoIcon className={"text-slate-500 cursor-pointer hover:text-primary transition-all duration-500 ease-in-out"} />
              </Link>
            </div>
          </div>
          <div className={"flex flex-col lg:flex-row gap:0 lg:gap-20"}>
            <div className={"flex-grow basis-60 md:basis-56"}>
              <h1 className={"text-2xl"}>Services</h1>
              <ul className={"mt-4"}>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Browse Jobs</li>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Companies</li>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Candidates</li>
              </ul>
            </div>
            <div className={"flex-grow basis-60 md:basis-56"}>
              <h1 className={"text-2xl"}>Company</h1>
              <ul className={"mt-4"}>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>About</li>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Blog</li>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>FAQ&lsquo;s</li>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Contact</li>
              </ul>
            </div>
            <div className={"flex-grow basis-60 md:basis-56"}>
              <h1 className={"text-2xl"}>Support</h1>
              <ul className={"mt-4"}>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Help Center</li>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Safety Center</li>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Community Guidelines</li>
              </ul>
            </div>
            <div className={"flex-grow basis-60 md:basis-56"}>
              <h1 className={"text-2xl"}>Legal</h1>
              <ul className={"mt-4"}>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Terms of use</li>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Terms & Conditions</li>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Privacy</li>
                <li className={"text-slate-500 my-4 hover:text-primary font-semibold cursor-pointer"}>Cookie Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}