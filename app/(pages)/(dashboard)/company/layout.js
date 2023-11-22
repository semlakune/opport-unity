
export const metadata = {
  title: "Company Dashboard",
  description: "Company Dashboard",
};
export default function CompanyLayout({ children }) {
  return (
    <section>
      <div className={"flex items-center justify-center p-10"}>
        <div className="bg-white shadow-xl rounded-md p-5">
          {children}
        </div>
      </div>
    </section>
  )
}