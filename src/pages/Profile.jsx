import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileApiAction } from "../redux/Reducers/UserReducer";
import { Modal, Form, Input, Radio, Button } from "antd";
import { http } from "../util/config";
import OrderHistory from "../components/OrderHistory";

const Profile = () => {
  const { userProfile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue(userProfile); // Set initial form values
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    try {
      const updatedValues = form.getFieldsValue();

      // Gửi request POST đến API updateProfile
      await http.post("/Users/updateProfile", updatedValues);

      // Cập nhật thông tin người dùng sau khi thành công
      const action = getProfileApiAction();
      dispatch(action);

      // Đóng modal
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Xử lý lỗi nếu cần
    }
  };

  const getProfileApi = async () => {
    const action = getProfileApiAction();
    dispatch(action);
  };

  useEffect(() => {
    getProfileApi();
  }, []);

  return (
    <div className="container">
      <div className="row mt-5 m-5 profile-wrapper">
        <div className="col-4">
          <img
            className="profile-img"
            src={userProfile.avatar}
            alt="..."
            width={200}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="col-8">
          <h5>Name: {userProfile.name}</h5>
          <h5>Email: {userProfile.email}</h5>
          <h5>Password: {userProfile.password}</h5>
          <h5>Phone: {userProfile.phone}</h5>

          <Button type="primary" onClick={showModal}>
            Update
          </Button>
        </div>
      </div>

      <Modal
        title="Update Profile"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group>
              <Radio value={true}>Male</Radio>
              <Radio value={false}>Female</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <OrderHistory />
    </div>
  );
};

export default Profile;
