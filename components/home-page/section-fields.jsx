import styles from "@/components/styles.module.css"
import {Button} from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons'
import { faBullhorn, faCalculator, faPaintBrush, faPen, faShoppingCart, faCode, faPhone } from '@fortawesome/pro-light-svg-icons'
import {Separator} from "@/components/ui/separator";
const SectionFields = () => {
  const fields = [
    {
      name: "Development",
      icon: faCode,
      jobs: "7k+ Jobs"
    },
    {
      name: "Telemarketing",
      icon: faPhone,
      jobs: "31k+ Jobs"
    },
    {
      name: "Writing",
      icon: faPen,
      jobs: "1k+ Jobs"
    },
    {
      name: "Design",
      icon: faPaintBrush,
      jobs: "2k+ Jobs"
    },
    {
      name: "Sales",
      icon: faShoppingCart,
      jobs: "3k+ Jobs"
    },
    {
      name: "Marketing",
      icon: faBullhorn,
      jobs: "4k+ Jobs"
    },
    {
      name: "Accounting",
      icon: faCalculator,
      jobs: "6k+ Jobs"
    }
  ]
  return (
    <section className={styles.field}>
      <div className="container">
        <div className={"flex justify-between items-center"}>
          <h1 className={"text-3xl"}>Most Demanding Categories.</h1>
          <Button variant={"link"} className={"text-center text-lg font-bold"}>Explore all fields <span className={"ml-2"}><FontAwesomeIcon icon={faAngleRight} /></span></Button>
        </div>
        <div className={"flex justify-evenly items-center py-20 mx-auto gap-6"}>
          {fields.map((field, index) => (
            <div key={index} className={styles.cardField}>
              <div className={styles.innerCardField}>
                <FontAwesomeIcon icon={field.icon} />
                <p>{field.name}</p>
                <p className={"text-neutral-400"}>{field.jobs}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={"flex items-center justify-center py-10 gap-10"}>
          <Separator className={"w-60"}/>
          <h1>How it’s Work?</h1>
          <Separator className={"w-60"}/>
        </div>
        <div className={"flex justify-center items-center w-100"}>
          <div className={"w-1/3 flex flex-col justify-center items-center text-center gap-4 px-20 border-b-2 pb-10 hover:border-b-primary transition-all ease-in-out"}>
            <p className={"bg-primary text-white py-2 px-3 w-fit rounded-2xl font-wotfardBold"}>01</p>
            <p className={"font-wotfardBold text-xl"}>Create Account</p>
            <p className={"text-neutral-600"}>It’s very easy to open an account and start your journey.</p>
          </div>
          <div className={"w-1/3 flex flex-col justify-center items-center text-center gap-4 px-20 border-b-2 pb-10 hover:border-b-primary transition-all ease-in-out"}>
            <p className={"bg-primary text-white py-2 px-3 w-fit rounded-2xl font-wotfardBold"}>02</p>
            <p className={"font-wotfardBold text-xl"}>Complete your profile</p>
            <p className={"text-neutral-600"}>Complete your profile with all the info to get attention of client.</p>
          </div>
          <div className={"w-1/3 flex flex-col justify-center items-center text-center gap-4 px-20 border-b-2 pb-10 hover:border-b-primary transition-all ease-in-out"}>
            <p className={"bg-primary text-white py-2 px-3 w-fit rounded-2xl font-wotfardBold"}>03</p>
            <p className={"font-wotfardBold text-xl"}>Apply job</p>
            <p className={"text-neutral-600"}>Apply & get your preferable jobs with all the requirements and get it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionFields;