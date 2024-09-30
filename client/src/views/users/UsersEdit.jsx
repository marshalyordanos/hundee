import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Select, Spin, Switch } from 'antd';
import styled from 'styled-components';
import { ButtonStyle, FlexStyle, FormStyle } from '../../components/commons/CommonStyles';
import userService from './UsersService';
import CommonModal from '../../components/commons/CommonModel';
import UsersPick from './UsersPick';
import dayjs from 'dayjs';

const { Option } = Select;

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};


const UsersEdit = ({ setIsModalOpen, isModelOpen, mode, setMode,usersData,setUsersData,searchData }) => {
  const [form] = Form.useForm();
  const [switch2, setSwitch2] = useState("")
  const [loading, setLoading] = useState("")
  const [userPick, setUserPick] = useState(false)



  useEffect(() => {
    const featchData = async () => {
      try {

        const data = await userService.getUser(mode);
        form.setFieldsValue({ user: {...data,date:dayjs(data.date)} });



      } catch (err) {
      }
    }
    if (mode == '') {

    } else {

      featchData()
    }
  }, [])


  const handleReset = () => {
    form.resetFields(); // Reset form fields
  };

  const userPickHandler = (data) => {
    console.log('userPickHandler', data)

    setUserPick(false)

  }


  const onAdd = async (datas) => {
    try {

      setLoading(true);

      const data = await userService.createUser(datas.user)
      setIsModalOpen(false)
      searchData()
      setLoading(false);

    } catch (err) {
      setLoading(false);
    }
  }

  const onUpdate = async (datas) => {

    try {

      setLoading(true);

      const data = await userService.updateUser(datas.user, mode)
      const mapData = usersData.map(user=>{
        if(user._id==mode){
          return data
        }else{
          return user
        }
      })
      setUsersData(mapData)
      setIsModalOpen(false)
      setLoading(false);

    } catch (err) {
      setLoading(false);
    }
  }


  const onFinish = (values) => {
    mode == '' ? onAdd(values) : onUpdate(values)
  };

  return (
    <div>
      {/*******  picks **********/}
      {userPick ? <CommonModal
        width={700}
        isModalOpen={userPick}
        setIsModalOpen={setUserPick}
      >
        <UsersPick
          setIsModalOpen={setUserPick}
          selectHandler={userPickHandler}
        />
      </CommonModal> : ""}


      {loading ? <SpinStyle>
        <Spin style={{ color: "#fff" }} size="large" />
      </SpinStyle> : ""}
      <button onClick={() => setUserPick(true)}>hhhhhh</button>
      <FormStyle
        form={form}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        onError={() => { }}

        validateMessages={validateMessages}
      >
        <FlexStyle>
          <Form.Item
            className=' flex-1'
            name={['user', 'fullName']}
            label="Full Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              className='border-gray-400 py-2'
            />
          </Form.Item>



          <Form.Item
            className=' flex-1 border-gray-400'
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                type: 'email',
                required: true
              },
            ]}
          >
            <Input
              className='border-gray-400 py-2'

            />
          </Form.Item>

          <Form.Item
            className=' flex-1 border-gray-400'
            name={['user', 'username']}
            label="Username"
            rules={[
              {
                required: true
              },
            ]}
          >
            <Input
              className='border-gray-400 py-2'

            />
          </Form.Item>




        </FlexStyle>
        <FlexStyle>
          <Form.Item
            name={['user', 'gender']}
            label="Gender"
            className=' flex-1'
            rules={[
              {
                required: true,
                message: 'Please select gender!',
              },
            ]}
          >
            <Select
              className='border-gray-400 '
              placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>


          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please select Phone Number!',
              },
            ]}
            className=' flex-1'
            name={['user', 'phoneNumber']} label="Phone Number">
            <Input
              className='border-gray-400 py-2'
            />
          </Form.Item>

        </FlexStyle>
        {/* <Form.Item
        name={['user', 'branch']}
        label="Branch"
        className=' flex-1'
        rules={[
          {
            required: true,
            message: 'Please select branch!',
          },
        ]}
      >
        <Select
        className='border-gray-400 '
        placeholder="select your branch">
          <Option value="Main Brnach">Main Branch</Option>
          <Option value="Store">Srore</Option>
        </Select>
      </Form.Item> */}


        <Form.Item
          name={['user', 'status']}
          label="Status"
          className=' flex-1'
          rules={[
            {
              required: true,
              message: 'Please select status!',
            },
          ]}
        >
          <Select
            className='border-gray-400 '
            placeholder="select your status">
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={['user', 'userType']}
          label="role"
          className=' flex-1'
          rules={[
            {
              required: true,
              message: 'Please select role!',
            },
          ]}
        >
          <Select
            className='border-gray-400 '
            placeholder="select your status">
            <Option value={'sales'}>Sales</Option>
            <Option value={'store'}>Store</Option>
            <Option value={'manager'}>Manager</Option>
            <Option value={'admin'}>Admin</Option>


          </Select>
        </Form.Item>

        <Form.Item name={['user', 'date']}  label="DatePicker">
            <DatePicker format={'YYYY/MM/DD'} />
        </Form.Item>
        <ButtonStyle>
          <button onClick={() => setIsModalOpen(false)} >
            cancel
          </button>
          <button type="submit" >
            Submit
          </button>
        </ButtonStyle>
      </FormStyle>

    </div>
  )
}



const SpinStyle = styled.div`
/* border: 1px solid; */
width: 50px;
height:  50px;
background-color: rgba(0,0,0,0.2);
z-index: 100;
display: flex;
border-radius:  120px;
justify-content: center;
align-items: center;
position: absolute;
left: 40%;

.ant-spin-dot .ant-spin-dot-spin {
  background-color: red; 
}
 


`



export default UsersEdit