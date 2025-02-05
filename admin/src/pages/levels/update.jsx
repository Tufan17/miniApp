import Container from "../../components/Container";
import { TextInput, Group, Select } from "@mantine/core";
import CustomButton from "../../components/Button";
import { updateLevel, getLevel } from "../../services/levelService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCefr } from "../../services/cefrService";
const LevelUpdatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [key, setKey] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cefr, setCefr] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["level", id],
    queryFn: () => getLevel(id),
  });
  const { data: cefrData } = useQuery({
    queryKey: ["cefrs"],
    queryFn: getCefr,
  });

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setKey(data.key);
      setCefr(data?.cefrId?._id);
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !description || !cefr) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    const response = await updateLevel(id, {
      name,
      description,
      key,
      cefrId: cefr,
    });

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
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 px-4"
      >
        <TextInput
          className="w-full  my-2"
          label="Sıra"
          placeholder="Sıra"
          type="number"
          required
          onChange={(e) => setKey(e.target.value)}
          value={key}
        />
        <TextInput
          className="w-full  my-2"
          label="İsim"
          placeholder="İsim"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <TextInput
          className="w-full  my-2"
          label="Açıklama"
          placeholder="Açıklama"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        {!isLoading && (
          <Select
            required
            className="w-full my-2"
            data={cefrData?.map((item) => ({
              value: item._id,
              label: item.name,
            }))}
            label="Cefr"
            placeholder="Cefr seçiniz"
            onChange={(value) => setCefr(value)}
          />
        )}

        <Group>
          <CustomButton type="submit">Kaydet</CustomButton>
        </Group>
      </form>
    </Container>
  );
};

export default LevelUpdatePage;
