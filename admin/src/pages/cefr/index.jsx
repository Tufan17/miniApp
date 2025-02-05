import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Button";
import Container from "../../components/Container";
import DataTable from "../../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import LoaderComponent from "../../components/loader";
import { toast } from "react-toastify";
import { deleteCefr } from "../../services/cefrService";
import { useEffect } from "react";
import { getCefr } from "../../services/cefrService";
const CefrPage = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError,refetch } = useQuery({
        queryKey: ["cefrs"],
        queryFn: getCefr,
      });

      useEffect(()=>{
        if(data?.length>0){
            localStorage.setItem("cefrKey",JSON.stringify(data[data.length-1].key+1));
        }
      },[data]);



      const deleteData = async (id)=>{
        const response = await deleteCefr(id);
        if(response?.status === true){
            toast.success("Cefr başarıyla silindi");
            refetch();
        }
      }
    
      if (isLoading) {
        return <LoaderComponent />;
      }
      if (isError) {
        return (<div>Error fetching cefr</div>);
      }
      const columns = [
        { name: 'key', key: 'key' },
        { name: 'İsim', key: 'name' },
        { name: 'Kayıt Tarihi', key: 'createdAt'},
        { name: 'İşlemler',key: 'action', buttons: ['update', 'delete'] },
      ];
  return (
      <Container>
        <div className="w-full flex justify-between items-center">
          <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">
            CEFR
          </h3>
          <CustomButton type="button" onClick={() => navigate("create")}>Ekle</CustomButton>
        </div>
        <DataTable
          columns={columns}
          data={data}
          deleteFunction={deleteData}
        />
      </Container>
  );
};

export default CefrPage;
