import LoaderComponent from "../../components/loader";
import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../services/roleService";
import DataTable from "../../components/DataTable";
import Container from "../../components/Container";
const RolePage = () => {
    const { data, isLoading, isError } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });


  if (isLoading) {
    return <LoaderComponent />;
  }
  if (isError) {
    return <div>Error fetching users</div>;
  }
  const columns = [
    { name: '#', key: '#' },
    { name: 'İsim', key: 'name' },
    { name: 'Açıklama', key: 'description' },
    { name: 'Kayıt Tarihi', key: 'createdAt' },
  ];

  return (
    <Container>
      <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">Roller</h3>
      <DataTable data={data} columns={columns} />
    </Container>
  );
};

export default RolePage;
