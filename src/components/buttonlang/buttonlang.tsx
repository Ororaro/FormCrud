import { Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../buttonlang/buttonlang.css";
const Buttonlang = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    setLang(value);
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
    console.log("lang", lang);
  }, [lang]);

  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
      <h2 style={{ padding:' 0 20px'}}>Form & Table</h2>
      <div className="langbtn">
        <Space wrap>
          <Select
            defaultValue="EN"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "en", label: "EN" },
              { value: "th", label: "TH" },
            ]}
          />
        </Space>
      </div>
    </div>
  );
};

export default Buttonlang;
