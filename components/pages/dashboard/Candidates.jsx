import Loading from "@/components/Loading";
import {DataTable} from "@/components/pages/dashboard/table/data-table";
import {candidatesColumns} from "@/components/pages/dashboard/table/columns/candidates-columns";

export default async function Candidates({ data, loading }) {
  if (loading) return <Loading />;
  return (
    <div className={"space-y-6"}>
      <div className={"flex flex-col"}>
        <h3 className={"text-lg font-semibold"}>Candidates</h3>
        <p className={"text-sm text-gray-400"}>List of candidates </p>
      </div>
      <DataTable data={data} columns={candidatesColumns} />
    </div>
  );
}