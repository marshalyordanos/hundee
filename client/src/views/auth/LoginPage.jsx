import React from "react";
import { useDispatch } from "react-redux";
import api from "../../api/api";
import { login } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish =async (values) => {
    console.log("Success:", values);
    try{
      const res = await dispatch(login(values));
    navigate("/dash");
    }catch(err){
      console.log("err",err)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // async function clickMe() {
  //   try {
  //     const data = await api.get("/auth1");
  //     console.log("data", data);
  //   } catch (err) {}
  // }
  // const loginHandler = async () => {
   
  // };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center  ">
      <div className=" max-w-[500px ] min-w-[270px] ">
        {/* <button onClick={clickMe}>Click me</button>
        <button onClick={loginHandler}>login</button> */}

        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          
        >
         <div className="flex flex-col items-center">
         <Form.Item
            label="Username"
            name="username"
            className="flex-1 w-full"

            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="flex-1 w-full"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
           
          >
            <button className=" bg-black px-8 py-2  text-white" type="submit" >
              Submit
            </button>
          </Form.Item>
         </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
