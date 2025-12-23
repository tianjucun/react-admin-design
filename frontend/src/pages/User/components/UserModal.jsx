import { memo, useMemo } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { FORM_RULES, USER_STATUS, USER_STATUS_TEXT } from '../constants';
import useFormModal from '@/hooks/useFormModal';

function adaptUserForForm (user) {
  return {
    ...user,
    status: user.status ?? USER_STATUS.ENABLED,
  };
}

/**
 * 用户模态框组件
 * 负责用户创建和编辑的弹窗展示，包含表单字段
 */
const UserModal = memo(({
  open,
  editingUser,
  roles = [],
  rolesLoading = false,
  onCancel,
  onSubmit,
  loading = false
}) => {
  // 使用通用 hook 处理表单回显
  const { form } = useFormModal({
    open,
    editingData: editingUser,
    adaptData: adaptUserForForm,
    defaultValues: {
      status: USER_STATUS.ENABLED,
    },
  });

  // 使用 useMemo 优化角色选项，避免每次渲染都重新创建
  const roleOptions = useMemo(() => {
    return roles.map(role => (
      <Select.Option key={role.id} value={role.id}>
        {role.name}
      </Select.Option>
    ));
  }, [roles]);

  // 状态选项
  const statusOptions = useMemo(() =>
    Object.values(USER_STATUS).map(status => (
      <Select.Option key={status} value={status}>
        {USER_STATUS_TEXT[status]}
      </Select.Option>
    )), []);

  return (
    <Modal
      title={editingUser ? '编辑用户' : '新增用户'}
      open={open}
      onCancel={onCancel}
      destroyOnHidden
      width={600}
      okButtonProps={{ loading }}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={FORM_RULES.username}
        >
          <Input
            placeholder="请输入用户名"
            disabled={!!editingUser}
            aria-label="用户名输入框"
          />
        </Form.Item>

        {!editingUser && (
          <Form.Item
            name="password"
            label="密码"
            rules={FORM_RULES.password}
          >
            <Input.Password
              placeholder="请输入密码"
              aria-label="密码输入框"
            />
          </Form.Item>
        )}

        <Form.Item
          name="nickname"
          label="昵称"
          rules={FORM_RULES.nickname}
        >
          <Input
            placeholder="请输入昵称"
            aria-label="昵称输入框"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={FORM_RULES.email}
        >
          <Input
            placeholder="请输入邮箱"
            type="email"
            aria-label="邮箱输入框"
          />
        </Form.Item>

        <Form.Item
          name="roleId"
          label="角色"
        >
          <Select
            placeholder="请选择角色"
            allowClear
            loading={rolesLoading}
            aria-label="角色选择器"
          >
            {roleOptions}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="状态"
        >
          <Select aria-label="状态选择器">
            {statusOptions}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
});

UserModal.displayName = 'UserModal';

export default UserModal;

