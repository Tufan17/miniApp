import Container from "../../components/Container";
import { TextInput, Group } from "@mantine/core";
import CustomButton from "../../components/Button";
import { createLevel } from "../../services/levelService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButon";
const LevelCreatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [key, setKey] = useState(0);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  useEffect(()=>{
    setKey(JSON.parse(localStorage.getItem("levelKey"))??0);
  },[]);


  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    if (!name || !key) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    const response = await createLevel({ name, description:description===""?"-":description, key });
    
    if (response?.status === true) {
      toast.success("Level başarıyla oluşturuldu");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } else {
      toast.error(response?.message);
    }
    setDisabled(false);
  };

  return (
    <Container>
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">
          Level Ekle
        </h3>
        <BackButton/>
      </div>

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
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <Group justify="center">
          <CustomButton type="submit" disabled={disabled}>Kaydet</CustomButton>
        </Group>
      </form>
    </Container>
  );
};

export default LevelCreatePage;
