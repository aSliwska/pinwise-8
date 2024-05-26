import { Button, Select } from "antd";

interface PersonalDataPanelProps {
  setAge: (age: string) => void;
  setMode: (mode: string) => void;
  setGender: (gender: string) => void;
  handleSubmit: () => void;
  setEducation: (education: string) => void;
}

const PersonalDataPanel = ({
  setAge,
  setMode,
  setGender,
  handleSubmit,
  setEducation,
}: PersonalDataPanelProps) => {
  const handleGoBack = () => {
    setMode("register");
  };

  return (
    <div className="flex flex-col justify-center">
      <div className=" flex mb-4">
        <Button style={{ fontWeight: 700 }} onClick={handleGoBack}>
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
                    <Select.Option value={"18-"}>&lt; 18</Select.Option>
                    <Select.Option value="18-30">18-25</Select.Option>
                    <Select.Option value="30-40">26-31</Select.Option>
                    <Select.Option value="40-50">32-47</Select.Option>
                    <Select.Option value="50-60">48-61</Select.Option>
                    <Select.Option value="60+">&gt; 62</Select.Option>
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

          <Button
            type="primary"
            size="large"
            block
            style={{ fontWeight: 700 }}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Załóż konto
          </Button>
        </div>
      </form>
    </div>
  );
};

export { PersonalDataPanel };
