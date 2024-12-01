import {useState, useEffect} from "react";
import {Input, Button, Form, Select, Modal, Pagination, Flex, Upload} from "antd";
import {IoIosSearch} from "react-icons/io";
import {MdOutlineMoreVert} from "react-icons/md";
import {UploadOutlined} from "@ant-design/icons";

import {ContractType, InputContractType , CourseType} from "./types";

import {apiService} from "./api/contract.service";

const {Option} = Select;


function App() {
    const [contracts, setContracts] = useState<ContractType[]>([]);
    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courses, setCourses] = useState<CourseType[]>([]);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const res = await apiService.getContracts(pageSize, currentPage, search);
                console.log("Contracts:", res.data.data.contracts);
                setContracts(res.data.data.contracts);
                setTotalCount(res.data.data.total);
            } catch (error) {
                console.error("Failed to fetch contracts:", error);
            }
        };
        fetchContracts();
    }, [currentPage, pageSize, search, isModalOpen]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await apiService.getCourses();
                console.log("Courses:", res.data.data);
                setCourses(res.data.data.courses);
            } catch (error) {
                console.error("Failed to fetch contracts:", error);
            }
        };
        fetchCourses();
    }, []);


    const [form] = Form.useForm();

    const handleSubmit = async (values:InputContractType) => {

        console.log("Form values:", values);
        try {
            let fileUrl = null;
            if (values.file) {
                const uploadResponse = await apiService.uploadFile(values.file.file);
                console.log(uploadResponse)
                fileUrl = uploadResponse.data.data[0]?.path;
                console.log("File uploaded:", fileUrl);
            }


            const contractData = {
                title: values.nomi,
                courseId: values.kurs,
                attachment: {
                    size: values.file.file.size,
                    url: fileUrl,
                    origName: values.file.file.name,
                },
            };

            const createResponse = await apiService.addContract(contractData);
            console.log("Contract created:", createResponse.data);

            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error("Failed to submit contract:", error);
            Modal.error({
                title: "Error",
                content: "Failed to create the contract. Please try again.",
            });
        }
    };

    return (
        <div className="App p-4 border-1 border-[#b3b5bb]">
            <Modal
                title="Shartnomani yaratish"
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    // className="space-y-4"
                >
                    {/* Select Field */}
                    <Form.Item
                        name="kurs"
                        label={
                            <div className="flex justify-between w-full">
                                <span>Kurs</span>
                                <span className="text-red-500">*</span>
                            </div>
                        }
                        // rules={[{ required: true, message: "Iltimos, kursni tanlang!"}]}
                    >
                        <Select
                            placeholder="Tanlang"
                            className="w-full"
                            dropdownClassName="py-2" // Custom class for dropdown
                        >
                            {courses.map((course) => (
                                <Option key={course.id} value={course.id}>
                                    {course.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        className="w-full"
                        name="nomi"
                        label={
                            <div className="flex justify-between w-full">
                                <span>Nomi</span>
                                <span className="text-red-500">*</span>
                            </div>
                        }
                        // rules={[{ required: true, message: "Iltimos, nomini kiriting!" }]}
                    >
                        <Input className={"py-2"} placeholder="Nomi"/>
                    </Form.Item>
                    <Form.Item name="file" className="w-full">
                        <Upload
                            beforeUpload={() => false}
                            className="w-full flex items-center justify-center border-2 border-dashed rounded-lg p-2 hover:border-green-500"
                        >
                            <Button
                                icon={<UploadOutlined className="text-green-500"/>}
                                className="bg-transparent border-0 text-green-500 hover:text-green-600 hover:bg-transparent"
                            >
                                Fayl biriktiring
                            </Button>
                        </Upload>
                    </Form.Item>


                    <div className="flex justify-end gap-4 mt-4">
                        <Button onClick={() => setIsModalOpen(false)} className="border-gray-300">
                            Bekor qilish
                        </Button>
                        <Button
                            onClick={() => form.submit()}
                            className="bg-green-500 hover:bg-green-600 text-white border-0"
                        >
                            Saqlash
                        </Button>
                    </div>

                </Form>
            </Modal>

            <Flex className="justify-between items-center mb-4 bg-[#fcfbfc] p-2 rounded-t-md">
                <Input
                    placeholder="Qidiruv"
                    prefix={<IoIosSearch/>}
                    size="large"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3 bg-transparent border-none focus:outline-none focus:bg-transparent"
                />
                <Button className="bg-[#0cb383] text-white" onClick={() => setIsModalOpen(true)}>
                    Qo'shish
                </Button>
            </Flex>

            <div className="flex w-full px-4 border-b border-gray-300 py-4 text-[#b3b5bb]">
                <div className="w-1/12">#</div>
                <div className="w-2/6">Nomi</div>
                <div className="w-2/6">Kurs</div>
                <div className="w-1/4 text-end"></div>
            </div>

            {contracts.map((contract, index) => (
                <div
                    key={contract.id}
                    className="flex w-full px-4 items-center border-b border-gray-200 py-4 hover:bg-gray-50"
                >
                    <div className="w-1/12">{index + 1 + (currentPage - 1) * pageSize}</div>
                    <div className="w-2/6">{contract.title}</div>
                    <div className="w-2/6">{contract.course.name}</div>
                    <div className="w-1/4 justify-items-end">
                        <MdOutlineMoreVert className="cursor-pointer text-end"/>
                    </div>
                </div>
            ))}

            <div className="flex justify-end mt-4">
                <Pagination
                    current={currentPage}
                    total={totalCount}
                    pageSize={pageSize}
                    onChange={(page, size) => {
                        setCurrentPage(page);
                        setPageSize(size || 10);
                    }}
                    showSizeChanger
                    pageSizeOptions={["5", "10", "20"]}
                />
            </div>
        </div>
    );
}

export default App;
