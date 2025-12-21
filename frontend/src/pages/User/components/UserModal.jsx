import { memo, useMemo } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { FORM_RULES, USER_STATUS, USER_STATUS_TEXT } from '../constants';

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
  form,
  loading = false
}) => {
  // 使用 useMemo 计算初始值，避免每次渲染都重新创建对象
  const initialValues = useMemo(() => {
    if (editingUser) {
      return adaptUserForForm(editingUser);
    }
    // 新增时的默认值
    return {
      status: USER_STATUS.ENABLED,
    };
  }, [editingUser]);

  // 使用 useMemo 优化角色选项，避免每次渲染都重新创建
  const roleOptions = useMemo(() => {
    return roles.map(role => (
      <Select.Option key={role.id} value={role.id}>
        {role.name}
      </Select.Option>
    ));
  }, [roles]);

  // 状态选项
  const statusOptions = useMemo(() => [
    <Select.Option key={USER_STATUS.ENABLED} value={USER_STATUS.ENABLED}>
      {USER_STATUS_TEXT[USER_STATUS.ENABLED]}
    </Select.Option>,
    <Select.Option key={USER_STATUS.DISABLED} value={USER_STATUS.DISABLED}>
      {USER_STATUS_TEXT[USER_STATUS.DISABLED]}
    </Select.Option>
  ], []);

  // 确保 form 实例存在
  if (!form) {
    return null;
  }

  return (
    <Modal
      title={editingUser ? '编辑用户' : '新增用户'}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnHidden
      okText="确定"
      cancelText="取消"
      width={600}
      loading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
        preserve={false}
      // 使用 key 确保每次 editingUser 变化时 Form 都会重新初始化
      // key={editingUser?.id || 'new'}
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

