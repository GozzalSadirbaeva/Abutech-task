import { Flex, Typography } from "antd";

import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useAuth } from "../providers/AuthProvider";


import { UserOutlined, LockOutlined } from "@ant-design/icons";



const { Title } = Typography;
// import logo from

type FieldType = {
  username?: string;
  password?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  const [form] = Form.useForm();

  const auth = useAuth();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    auth.signIn(values);
  };

  return (
    <Flex className="h-screen ">
      <div className="w-1/3">
        <img
            className="h-full w-full object-cover" src="/img.png" alt="" />
      </div>
      <div className="w-2/3 h-screen p-2 flex flex-col">

        <div className="w-auto ml-8 mt-8">
          <img
              src="/logo.svg"
              alt="Logo"
              className="mb-4"
              style={{height: "50px"}}
          />
        </div>

        <div className="w-1/2 h-full flex items-center justify-center">
          <Flex vertical={true} className="w-3/4">
            <div className="flex-1">
              <Form layout="vertical"
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                <Title level={4} className="mb-6">
                  Tizimga kirish
                </Title>
                <Form.Item label="Login" name="username">
                  <Input
                      placeholder="Loginni kiriting"
                  />
                </Form.Item>

                <Form.Item label="Parol" name="password">
                  <Input.Password
                      placeholder="Parolni kiriting"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                      htmlType="submit"
                      className="w-full bg-green-500 hover:bg-green-600 text-white hover:text-white">
                    Kirish
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Flex>
        </div>
        {/*<div className="w-full h-max flex-1 items-center justify-center content-center mt-5 pl-9">*/}
        {/*  <Form*/}
        {/*      className="w-3/4 items-center"*/}
        {/*      name="basic"*/}
        {/*      layout="vertical"*/}
        {/*      labelCol={{span: 8}}*/}
        {/*      wrapperCol={{span: 16}}*/}
        {/*      style={{maxWidth: 600}}*/}
        {/*      initialValues={{remember: true}}*/}
        {/*      onFinish={onFinish}*/}
        {/*      onFinishFailed={onFinishFailed}*/}
        {/*      autoComplete="off"*/}
        {/*  >*/}
        {/*    <h1 className="mb-4 font-bold">Tizimga kirish</h1>*/}
        {/*    <Form.Item<FieldType>*/}
        {/*        label="Login"*/}
        {/*        className="w-full"*/}
        {/*        name="username"*/}
        {/*    >*/}
        {/*      <Input*/}
        {/*          placeholder="Loginni kiriting"*/}
        {/*          className="border-[#E3E3E3] rounded-s-lg w-full"*/}
        {/*      />*/}
        {/*    </Form.Item>*/}

        {/*    <Form.Item<FieldType>*/}
        {/*        className="w-full"*/}
        {/*        label="Parol"*/}
        {/*        name="password"*/}
        {/*    >*/}
        {/*      <Input*/}
        {/*          placeholder="Parolni kiriting"*/}
        {/*          className="border-[#E3E3E3] rounded-s-lg w-full"*/}
        {/*      />*/}
        {/*    </Form.Item>*/}

        {/*    /!* <Form.Item<FieldType>*/}
        {/*      label="Password"*/}
        {/*      name="password"*/}
        {/*      rules={[*/}
        {/*        { required: true, message: "Please input your password!" },*/}
        {/*      ]}*/}
        {/*    >*/}
        {/*      <Input.Password />*/}
        {/*    </Form.Item> *!/*/}

        {/*    <Button className="bg-[#0EB182] w-full" htmlType="submit">*/}
        {/*      Submit*/}
        {/*    </Button>*/}
        {/*  </Form>*/}
        {/*</div>*/}
      </div>
    </Flex>
  );
}

export default Login;
