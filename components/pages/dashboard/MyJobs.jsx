import {DataTable} from "@/components/pages/dashboard/table/data-table";
import {myJobsColumns} from "@/components/pages/dashboard/table/columns/my-jobs-columns";
import Loading from "@/components/Loading";

export default async function MyJobs({ data, loading }) {
  if (loading) return <Loading />;
  return (
    <div className={"space-y-6"}>
      <div className={"flex flex-col"}>
        <h3 className={"text-lg font-semibold"}>My Jobs</h3>
        <p className={"text-sm text-gray-400"}>Your listed jobs</p>
      </div>
      <DataTable data={data} columns={myJobsColumns} userType={"EMPLOYER"} />
    </div>
  );
}