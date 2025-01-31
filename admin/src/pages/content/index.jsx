import { useQuery } from "@tanstack/react-query";
import { getContents, deleteContent } from "../../services/contentService";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Button";
import DataTable from "../../components/DataTable";
import { toast } from "react-toastify";
import LoaderComponent from "../../components/loader";
const ContentPage = () => {
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["contents"],
        queryFn: getContents
    })
    const deleteData = async (id)=>{
        const response = await deleteContent(id);
        if(response?.status === true){
            toast.success("Content başarıyla silindi");
            refetch();
        }
      }
    const navigate = useNavigate();
    if (isLoading) {
      return <LoaderComponent />;
    }
    if(isError) return <div>Error</div>

    const columns = [
        { name: '#', key: '#' },
        { name: 'İsim', key: 'name' },
        { name: 'Seviye', key: 'levelId.name' },
        { name: 'Açıklama', key: 'description' },
        { name: 'Kayıt Tarihi', key: 'createdAt'},
        { name: 'İşlemler',key: 'action', buttons: ['update', 'delete'] },
      ];
  return (
    <Container>
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">
          Leveller
        </h3>
        <CustomButton type="button"  onClick={() => navigate("create")}>Ekle</CustomButton>
      </div>
      <DataTable
        columns={columns}
        data={data}
        deleteFunction={deleteData}
      />
    </Container>
  );
}

export default ContentPage;