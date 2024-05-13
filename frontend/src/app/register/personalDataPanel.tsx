import { Button, Select } from "antd";
import { useState } from "react";

interface PersonalDataPanelProps {
  setMode: (mode: string) => void;
}

const PersonalDataPanel = ({ setMode }: PersonalDataPanelProps) => {
  const [gender, setGender] = useState<string>("Wybierz");
  const [age, setAge] = useState<string>("18-");
  const [education, setEducation] = useState<string>("Podstawowe");

  const handleGoBack = () => {
    setMode("register");
  };

  return (
    <div className="flex flex-col justify-center">
      <div className=" flex mb-4">
        <Button
          type="primary"
          size="small"
          block
          style={{ fontWeight: 700 }}
          onClick={handleGoBack}
        >
          &larr; Go Back
        </Button>
      </div>
      <form>
        <div className="flex flex-col items-center justify-between gap-12 rounded-lg text-white">
          <div className="text-5xl font-bold">Dane osobowe</div>

          <table className="text-xl w-full">
            <tbody>
              <tr className="table-row-gap">
                <td>Płeć</td>
                <td>
                  <Select
                    className="w-full"
                    onChange={(value) => setGender(value)}
                    defaultValue={"Wybierz"}
                  >
                    <Select.Option value="Kobieta">Kobieta</Select.Option>
                    <Select.Option value="Mężczyzna">Mężczyzna</Select.Option>
                    <Select.Option value="Inna">Inna</Select.Option>
                  </Select>
                </td>
              </tr>
              <tr className="table-row-gap">
                <td>Wiek</td>
                <td>
                  <Select
                    className="w-full"
                    onChange={(value) => setAge(value)}
                    defaultValue={"Wybierz"}
                  >
                    <Select.Option value={"18-"}>18-</Select.Option>
                    <Select.Option value={"18-24"}>19-24</Select.Option>
                    <Select.Option value={"25-34"}>25-34</Select.Option>
                    <Select.Option value={"35-44"}>35-44</Select.Option>
                    <Select.Option value={"45-54"}>45-54</Select.Option>
                    <Select.Option value={"55-64"}>55-64</Select.Option>
                    <Select.Option value={"65-74"}>65-74</Select.Option>
                    <Select.Option value={"75-84"}>75-84</Select.Option>
                    <Select.Option value={"85+"}>85+</Select.Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td>Edukacja</td>
                <td className="items-right">
                  <Select
                    className="w-full"
                    onChange={(value) => setEducation(value)}
                    defaultValue={"Wybierz"}
                  >
                    <Select.Option value="Podstawowe">Podstawowe</Select.Option>
                    <Select.Option value="Średnie">Średnie</Select.Option>
                    <Select.Option value="Wyższe">Wyższe</Select.Option>
                    <Select.Option value="Inne">Inne</Select.Option>
                  </Select>
                </td>
              </tr>
            </tbody>
          </table>

          <Button type="primary" size="large" block style={{ fontWeight: 700 }}>
            Załóż konto
          </Button>
        </div>
      </form>
    </div>
  );
};

export { PersonalDataPanel };
