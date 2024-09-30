import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Switch,
  DatePicker,
  Divider,
} from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

import {
  ButtonStyle,
  FlexStyle,
  FormStyle,
} from "../../components/commons/CommonStyles";
import stateService from "./StateService";
import CommonModal from "../../components/commons/CommonModel";
import StatePick from "./StatePick";
import dayjs from "dayjs";
import UsersPick from "../users/UsersPick";

const { Option } = Select;

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const StateEdit = ({
  setIsModalOpen,
  isModelOpen,
  mode,
  setMode,
  stateData,
  searchData,
}) => {
  const [form] = Form.useForm();
  const [switch2, setSwitch2] = useState("");
  const [loading, setLoading] = useState("");
  const [userPick, setUserPick] = useState(false);

  const [user, setUser] = useState({});
  //2
  useEffect(() => {
    const featchData = async () => {
      try {
        const data = await stateService.getStat(mode);
        form.setFieldsValue({
          stat: {
            ...data,
            user_id: data?.user_id._id,
            updatedAt: dayjs(data.updatedAt),
          },
        });
        setUser(data?.user_id);
      } catch (err) {}
    };
    if (mode == "") {
    } else {
      featchData();
    }
  }, []);

  const handleReset = () => {
    form.resetFields(); // Reset form fields
  };

  const userPickHandler = (data) => {
    console.log("statPickHandler", data);
    setUser(data[0]);
    form.setFieldsValue({
      stat: {
        ...form.getFieldsValue().stat,
        user_id: data[0]._id,
      },
    });
    setUserPick(false);
  };

  const onAdd = async (datas) => {
    try {
      setLoading(true);

      const data = await stateService.createStat(datas.stat);
      setIsModalOpen(false);
      searchData();

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const onUpdate = async (datas) => {
    try {
      setLoading(true);

      const data = await stateService.updateStat(datas.stat, mode);
      searchData();
      setIsModalOpen(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    mode == "" ? onAdd(values) : onUpdate(values);
  };

  return (
    <div>
      {/*******  picks **********/}

      {userPick ? (
        <CommonModal
          width={700}
          isModalOpen={userPick}
          setIsModalOpen={setUserPick}
        >
          <UsersPick
            selectType={"radio"}
            setIsModalOpen={setUserPick}
            selectHandler={userPickHandler}
          />
        </CommonModal>
      ) : (
        ""
      )}

      {loading ? (
        <SpinStyle>
          <Spin style={{ color: "#fff" }} size="large" />
        </SpinStyle>
      ) : (
        ""
      )}

      <FormStyle
        form={form}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        onError={() => {}}
        validateMessages={validateMessages}
      >
        <Form.Item
          className=" flex-1"
          name={["stat", "name"]}
          label="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input className="border-gray-400 py-2" />
        </Form.Item>

        <Form.Item
          className=" flex-1"
          name={["stat", "user_id"]}
          label="User"
          rules={[
            {
              required: true,
              message: "Please select a customer",
            },
          ]}
        >
          <div className="flex items-center bg-[#F5F5F5]">
            <div className="flex-1 bg-white">
              <Input
                value={user?.username}
                disabled
                className="border-none py-2 bg-red-700  "
              />
            </div>

            {
              <Button
                onClick={() => setUserPick(true)}
                shape="circle"
                icon={<SearchOutlined />}
                size={"small"}
              />
            }
          </div>
        </Form.Item>

        <ButtonStyle>
          <button onClick={() => setIsModalOpen(false)}>cancel</button>
          <button type="submit">Submit</button>
        </ButtonStyle>
      </FormStyle>
    </div>
  );
};

const SpinStyle = styled.div`
  /* border: 1px solid; */
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  border-radius: 120px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 40%;

  .ant-spin-dot .ant-spin-dot-spin {
    background-color: red;
  }
`;

export default StateEdit;
