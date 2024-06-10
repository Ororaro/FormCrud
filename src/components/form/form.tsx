import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
} from "antd";
import TableComponent from "../table/table";
import { DatePicker } from "antd";
import {
  ChangeEvent,
  useState,
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
} from "react";
import "./form.css";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../../store/list-slice";
import dayjs, { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store";
const { Option } = Select;

interface FormValues {
  date: Dayjs | null;
  title: string;
  firstname: string;
  lastname: string;
  birthday: Dayjs | null;
  nationality: string;
  citizenID: string;
  gender: string;
  phonelang: string;
  phone: string;
  passportno: string;
  salary: string;
}

interface User {
  id: string;
  data: {
    title: string;
    firstname: string;
    lastname: string;
    birthday: string;
    nationality: string;
    citizenID: string;
    gender: string;
    phonelang: string;
    phone: string;
    passportno: string;
    salary: string;
  };
}
const FormComponent = () => {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const updateUser = useSelector(
    (state: RootState) => state.counter.updateUser
  ) as User[];

  const [idNumber, setIdNumber] = useState<string[]>(new Array(5).fill(""));
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>();
  const [currentId, setCurrentId] = useState<string>("");

  useEffect(() => {
    const idNumberString = idNumber.join("");
    form.setFieldsValue({
      citizenID: idNumberString,
    });
  }, [form, idNumber]);

  useEffect(() => {
    if (updateUser && updateUser.length > 0) {
      const citizenIDParts = splitCitizenID(updateUser[0].data.citizenID);
      setCurrentId(updateUser[0]?.id);
      setSelectedGender(updateUser[0].data.gender);
      setIdNumber(citizenIDParts);
      form.setFieldsValue({
        title: updateUser[0]?.data?.title,
        firstname: updateUser[0]?.data?.firstname,
        lastname: updateUser[0]?.data?.lastname,
        birthday: dayjs(updateUser[0]?.data?.birthday),
        nationality: updateUser[0]?.data?.nationality,
        citizenID: updateUser[0]?.data?.citizenID,
        gender: updateUser[0]?.data?.gender,
        phonelang: updateUser[0]?.data?.phonelang,
        phone: updateUser[0]?.data?.phone,
        passportno: updateUser[0]?.data?.passportno,
        salary: updateUser[0]?.data?.salary,
      });
    } else {
      form.resetFields();
      setIdNumber(new Array(5).fill(""));
      setSelectedGender("");
      setCurrentId("");
    }
  }, [updateUser]);

  useEffect(() => {
    onReset();
  }, []);

  const splitCitizenID = (citizenID: string) => {
    const parts: string[] = [];
    parts?.push(citizenID?.slice(0, 1));
    parts?.push(citizenID?.slice(1, 5));
    parts?.push(citizenID?.slice(5, 10));
    parts?.push(citizenID?.slice(10, 12));
    parts?.push(citizenID?.slice(12, 13));
    return parts;
  };

  const onFinish = (values: FormValues) => {
    if (!localStorage.getItem("updateList")) {
      dispatch(
        addUser({
          ...values,
          birthday: selectedDate?.format("YYYY-MM-DD"),
        })
      );
      onReset();
      alert("Save Success");
    } else {
      localStorage.removeItem("updateList");
      dispatch(
        editUser({
          id: currentId,
          ...values,
          data: {
            ...values,
            birthday: selectedDate?.format("YYYY-MM-DD"),
          },
        })
      );
      onReset();
      alert("Save Success");
    }
  };

  const onReset = () => {
    form.resetFields();
    setIdNumber(new Array(5).fill(""));
    setSelectedGender("");
    localStorage.removeItem("updateList");
  };

  const handleGenderChange = (e: RadioChangeEvent) => {
    setSelectedGender(e?.target?.value);
  };

  const handleChangeCitizen = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const newIdNumber = [...idNumber];
    newIdNumber[index] = value;
    setIdNumber(newIdNumber);
  };

  const maxLengths = [1, 4, 5, 2, 1];

  const handleKeyUp = (
    e: ReactKeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputElement = e.currentTarget;
    if (inputElement.value.length === maxLengths[index] && index < 4) {
      (document.getElementById(`idNumber-${index + 1}`) as HTMLElement).focus();
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };
  return (
    <>
      <Form
        name="nest-messages"
        onFinish={onFinish}
        form={form}
        style={{
          border: "1px solid black",
          maxWidth: "80%",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Row>
          <Col md={4}>
            <Form.Item
              name="title"
              label={t("form.title")}
              rules={[{ required: true }]}
              style={{ maxWidth: 200 }}
            >
              <Select placeholder={t("form.title")}>
                <Option value="Mr">{t("form.mr")}</Option>
                <Option value="Mrs">{t("form.mrs")}</Option>
                <Option value="Ms">{t("form.ms")}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={10}>
            <Form.Item
              name="firstname"
              label={t("form.firstname")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={10}>
            <Form.Item
              name="lastname"
              label={t("form.lastname")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Item
              name="birthday"
              label={t("form.birthday")}
              rules={[{ required: true }]}
            >
              <DatePicker onChange={handleDateChange} />
            </Form.Item>
          </Col>
          <Col md={10}>
            <Form.Item
              name="nationality"
              label={t("form.nationality")}
              rules={[{ required: true }]}
            >
              <Select placeholder={t("form.selectnation")}>
                <Option value="Thai">{t("form.thai")}</Option>
                <Option value="French">{t("form.french")}</Option>
                <Option value="American">{t("form.american")}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Item label={t("form.citizenID")} name="citizenID">
              <Row>
                {idNumber.map((digit, index) => (
                  <Col span={4} key={index} style={{ marginRight: "10px" }}>
                    <Input
                      id={`idNumber-${index}`}
                      value={digit}
                      maxLength={maxLengths[index]}
                      onChange={(e) => handleChangeCitizen(e, index)}
                      onKeyUp={(e) => handleKeyUp(e, index)}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              name="gender"
              label={t("form.gender")}
              rules={[{ required: true }]}
            >
              <Radio.Group onChange={handleGenderChange} value={selectedGender}>
                <Radio value="male">{t("form.male")}</Radio>
                <Radio value="female">{t("form.female")}</Radio>
                <Radio value="unsex">{t("form.unsex")}</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Form.Item
              name="phonelang"
              label={t("form.mobile_Phone")}
              rules={[{ required: true }]}
            >
              <Select style={{ width: 100 }}>
                <Option value="+66">
                  <div style={{ marginTop: "8px", display: "flex" }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/1599px-Flag_of_Thailand.svg.png"
                      width="20px"
                      height="20px"
                      style={{ marginRight: "5px" }}
                    ></img>
                    <span>+66</span>
                  </div>
                </Option>
                <Option value="+1">
                  <div style={{ marginTop: "8px", display: "flex" }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1600px-Flag_of_the_United_States.svg.png?20151118161041"
                      width="20px"
                      height="20px"
                      style={{ marginRight: "5px" }}
                    ></img>
                    <span>+1</span>
                  </div>
                </Option>
                <Option value="+33">
                  <div style={{ marginTop: "8px", display: "flex" }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1599px-Flag_of_France.svg.png?20220120162234"
                      width="20px"
                      height="20px"
                      style={{ marginRight: "5px" }}
                    ></img>
                    <span>+33</span>
                  </div>
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col
            md={1}
            style={
              i18n.language === "en"
                ? { marginLeft: "10px", margin: "5px" }
                : { paddingLeft: "30px", margin: "5px 15px" }
            }
          >
            -
          </Col>
          <Col md={6}>
            <Form.Item
              name="phone"
              rules={[{ required: true }]}
              style={{ marginLeft: "-10px" }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Form.Item label={t("form.passport_No")} name="passportno">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Form.Item
              label={t("form.epSalary")}
              name="salary"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} style={{ textAlign: "center" }}>
            <Form.Item>
              <Button htmlType="button" onClick={onReset}>
                {t("form.reset")}
              </Button>
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item>
              <Button htmlType="submit"> {t("form.submit")}</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <TableComponent />
    </>
  );
};

export default FormComponent;
