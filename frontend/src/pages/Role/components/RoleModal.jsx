import { Modal, Form, Input } from 'antd';
import { memo } from 'react';


const RoleModal = memo(({ open, onCancel, onSubmit, editingRole, form, loading = false }) => {
  if (!form) {
    return null;
  }
  return (
    <Modal
      title={editingRole ? '编辑角色' : '新增角色'}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnHidden
      okText="确定"
      cancelText="取消"
      okButtonProps={{ loading }}
      width={600}
    // loading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={editingRole}
        onFinish={onSubmit}
        preserve={false}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="角色名称"
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item
          name="code"
          label="角色编码"
          rules={[{ required: true, message: '请输入角色编码' }]}
        >
          <Input placeholder="请输入角色编码" />
        </Form.Item>
        <Form.Item
          name="description"
          label="描述"
        >
          <Input.TextArea placeholder="请输入描述" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
})

RoleModal.displayName = 'RoleModal';
export default RoleModal;