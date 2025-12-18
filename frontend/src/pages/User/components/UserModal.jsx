import { memo, useCallback } from 'react';
import { Modal } from 'antd';
import UserForm from './UserForm';

/**
 * 用户模态框组件
 * 负责用户创建和编辑的弹窗展示
 */
const UserModal = memo(({
  open,
  editingUser,
  roles,
  onCancel,
  onSubmit,
  form
}) => {
  const handleOk = useCallback(async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
    } catch (error) {
      // 表单验证失败，不关闭弹窗
      if (error.errorFields) {
        // Ant Design 表单验证错误，已在 UI 中显示
        return;
      }
      console.error('表单提交失败:', error);
    }
  }, [form, onSubmit]);

  const handleCancel = useCallback(() => {
    // 直接调用 onCancel，form 的重置已经在 useUserModal hook 中处理
    onCancel();
  }, [onCancel]);

  // 确保 form 实例存在
  if (!form) {
    return null;
  }

  return (
    <Modal
      title={editingUser ? '编辑用户' : '新增用户'}
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      destroyOnHidden
      okText="确定"
      cancelText="取消"
      width={600}
    >
      {/* 只在 Modal 打开时渲染 Form，确保 form 实例正确连接 */}
      {open && (
        <UserForm
          form={form}
          roles={roles}
          editingUser={editingUser}
        />
      )}
    </Modal>
  );
});

UserModal.displayName = 'UserModal';

export default UserModal;

