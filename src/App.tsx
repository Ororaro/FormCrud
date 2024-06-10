import { Button } from "antd";
import "./App.css";
import Buttonlang from "./components/buttonlang/buttonlang";
import FormComponent from "./components/form/form";
import { useTranslation } from "react-i18next";
function App() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Buttonlang />
      <div style={{ textAlign: "right", padding:'0 10px' }}>
        <Button>{t("form.home")}</Button>
      </div>
      <FormComponent />
    </div>
  );
}

export default App;
