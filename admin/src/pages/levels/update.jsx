import Container from "../../components/Container";
import { TextInput, Group } from "@mantine/core";
import CustomButton from "../../components/Button";
import { updateLevel, getLevel } from "../../services/levelService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const LevelUpdatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [key, setKey] = useState(0);
  const navigate = useNavigate();
  const {id} = useParams();
  const {data} = useQuery({
    queryKey: ["level", id],
    queryFn: () => getLevel(id)
  });

  useEffect(()=>{
    if(data){
        setName(data.name);
        setDescription(data.description);
        setKey(data.key);
    }
  },[data])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !description) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    const response = await updateLevel(id,{ name, description, key });
    
    if (response) {
      toast.success("Level başarıyla güncellendi");
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
        Level Ekle
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

          <TextInput
            className="w-full md:w-1/2 my-2"
            label="Açıklama"
            placeholder="Açıklama"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <Group justify="center">
          <CustomButton type="submit">Kaydet</CustomButton>
        </Group>
      </form>
    </Container>
  );
};

export default LevelUpdatePage;
