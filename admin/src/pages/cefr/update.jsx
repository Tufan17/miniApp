import Container from "../../components/Container";
import { TextInput, Group } from "@mantine/core";
import CustomButton from "../../components/Button";
import { updateCefr, getCefrById } from "../../services/cefrService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const CefrUpdatePage = () => {
  const [name, setName] = useState("");
  const [key, setKey] = useState(0);
  const navigate = useNavigate();
  const {id} = useParams();
  const {data} = useQuery({
    queryKey: ["cefr", id],
    queryFn: () => getCefrById(id)
  });

  useEffect(()=>{
    if(data){
        setName(data.name);
        setKey(data.key);
    }
  },[data])

  const handleSubmit = async (event) => {
    event.preventDefault();
      if (!name || !key) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    const response = await updateCefr(id,{ name, key });
    
    if (response) {
      toast.success("Cefr başarıyla güncellendi");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <Container>
      <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">
          Cefr Güncelle
      </h3>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col  items-end justify-end content-end gap-2"
      >
        <div className="w-full flex flex-col md:flex-row p-2 rounded-md gap-2">
        <TextInput
            className="w-full md:w-1/2 my-2"
            label="Sıra"
            placeholder="Sıra"
            type="number"
            required
            onChange={(e) => setKey(e.target.value)}
            value={key}
          />  
          <TextInput
            className="w-full md:w-1/2 my-2"
            label="İsim"
            placeholder="İsim"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />


        </div>

        <Group justify="center">
          <CustomButton type="submit">Kaydet</CustomButton>
        </Group>
      </form>
    </Container>
  );
};

  export default CefrUpdatePage;
