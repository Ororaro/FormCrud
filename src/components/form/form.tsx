import { Button, Col, Form, Input, Row, Select } from "antd";
import TableComponent from "../table/table";
import { DatePicker } from "antd";
import {
  ChangeEvent,
  useState,
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
} from "react";
import { Checkbox } from "antd";
import "./form.css";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../../store/cart-slice";
import moment, { Moment } from "moment";
import dayjs, { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const { Option } = Select;

const plainOptions = ["Male", "Female", "Unsex"];

interface FormValues {
  date: Dayjs | null;
}
const FormComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const updateUser = useSelector((state: any) => state.counter.updateUser);

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
  }, [updateUser]);

  const splitCitizenID = (citizenID: string) => {
    const parts = [];
    parts.push(citizenID.slice(0, 1));
    parts.push(citizenID.slice(1, 5));
    parts.push(citizenID.slice(5, 10));
    parts.push(citizenID.slice(10, 12));
    parts.push(citizenID.slice(12, 13));
    return parts;
  };

  const onFinish = (values: FormValues) => {
    if (!localStorage.getItem("updateList")) {
      console.log("addUser");
      dispatch(
        addUser({ ...values, birthday: selectedDate?.format("YYYY-MM-DD") })
      );
      onReset()
      alert("Save Success")
    } else {
      console.log("updateUser");
      localStorage.removeItem("updateList");

      dispatch(
        editUser({
          id: currentId,
          ...values,
          birthday: selectedDate?.format("YYYY-MM-DD"),
        })
      );
      onReset()
      alert("Save Success")
    }
  };

  const onReset = () => {
    form.resetFields();
    setIdNumber(new Array(5).fill(""));
    setSelectedGender("");
  };

  const handleGenderChange = (e: CheckboxChangeEvent) => {
    setSelectedGender(e.target.value);
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
              label="title"
              rules={[{ required: true }]}
              style={{ maxWidth: 200 }}
            >
              <Select placeholder="title">
                <Option value="Mr">Mr.</Option>
                <Option value="Mrs">Mrs.</Option>
                <Option value="Ms">Ms.</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col md={10}>
            <Form.Item
              name="firstname"
              label="Firstname"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={10}>
            <Form.Item
              name="lastname"
              label="lastname"
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
              label="Birthday"
              rules={[{ required: true }]}
            >
              <DatePicker onChange={handleDateChange} />
            </Form.Item>
          </Col>
          <Col md={10}>
            <Form.Item
              name="nationality"
              label="Nationality"
              rules={[{ required: true }]}
            >
              <Select placeholder="Nationality" allowClear>
                <Option value="Thai">Thai</Option>
                <Option value="French">French</Option>
                <Option value="American">American</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Item label="CitizenID" name="citizenID">
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
              label="Gender"
              rules={[{ required: true }]}
            >
              <Row>
                {plainOptions.map((item) => {
                  return (
                    <Col md={1.5}>
                      <Checkbox
                        onChange={handleGenderChange}
                        checked={selectedGender === item}
                        value={item}
                      >
                        {item}
                      </Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Form.Item
              label="Mobile Phone"
              name="phonelang"
              rules={[{ required: true }]}
            >
              <Select style={{ width: 100 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={1} style={{ margin: "5px" }}>
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
            <Form.Item label="Passport No" name="passportno">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Form.Item
              label="Expected Salary"
              name="salary"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} style={{ textAlign: "center" }}>
            <Form.Item>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <TableComponent />
    </>
  );
};

export default FormComponent;
