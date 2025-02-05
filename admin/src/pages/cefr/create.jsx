import Container from "../../components/Container";
import { TextInput, Group } from "@mantine/core";
import CustomButton from "../../components/Button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButon";
import { createCefr } from "../../services/cefrService";
const CefrCreatePage = () => {
  const [name, setName] = useState("");
  const [key, setKey] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(()=>{
    setKey(JSON.parse(localStorage.getItem("cefrKey"))??1);
  },[]);


  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    if (!name || !key) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    const response = await  createCefr({ name, key });
    
    if (response?.status === true) {
      toast.success("Cefr başarıyla oluşturuldu");
      setName("");
      setKey(key+1);
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
        </div>

        <Group justify="center">
          <CustomButton type="submit" disabled={disabled}>Kaydet</CustomButton>
        </Group>
      </form>
    </Container>
  );
};

export default CefrCreatePage;
