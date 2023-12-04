
export default function DashboardTemplate({ children }) {
  return (
    <div className={"w-full"}>
      <div className={"bg-transparent"}>
        <div className={"flex flex-col p-5"}>
          {children}
        </div>
      </div>
    </div>
  )
}