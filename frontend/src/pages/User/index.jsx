import { useCallback } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useUserList from './hooks/useUserList';
import useUserForm from './hooks/useUserForm';
import useUserModal from './hooks/useUserModal';
import UserSearchBar from './components/UserSearchBar';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import UserDetailModal from './components/UserDetailModal';

/**
 * 用户管理页面主组件
 * 负责组合各个子组件，协调业务逻辑
 * 
 * 设计原则：
 * 1. 容器组件只负责组合和协调，不包含具体业务逻辑
 * 2. 所有业务逻辑都在 hooks 中处理
 * 3. UI 组件只负责展示和事件传递
 */
const User = () => {
  // 列表相关逻辑
  const {
    dataSource,
    loading,
    total,
    pagination,
    handlePageChange,
    handleSearch,
    refresh
  } = useUserList();

  // 表单相关逻辑（CRUD 操作）
  const {
    loading: submitUserIsLoading,
    deleteUser,
    updateUserStatus,
    handleSubmit: submitUser
  } = useUserForm(refresh);

  // 模态框相关逻辑（显示/隐藏、编辑状态）
  const {
    modalVisible,
    editingUser,
    form,
    roles,
    rolesLoading,
    handleAdd,
    handleEdit,
    handleCancel,
    handleSubmitSuccess,
    // 详情模态框
    detailModalVisible,
    viewingUser,
    handleView,
    handleDetailCancel
  } = useUserModal();

  // 处理表单提交（协调表单逻辑和模态框逻辑）
  const handleSubmit = useCallback(async (values) => {
    const success = await submitUser(editingUser, values);
    if (success) {
      handleSubmitSuccess();
    }
  }, [editingUser, submitUser, handleSubmitSuccess]);

  // 处理删除（直接调用 hook 方法，无需额外包装）
  const handleDelete = deleteUser;

  // 处理状态变更（直接调用 hook 方法，无需额外包装）
  const handleStatusChange = updateUserStatus;

  return (
    <div>
      <Space
        style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}
        size="middle"
      >
        <UserSearchBar onSearch={handleSearch} />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          新增用户
        </Button>
      </Space>

      <UserTable
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        total={total}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <UserModal
        open={modalVisible}
        editingUser={editingUser}
        loading={submitUserIsLoading}
        roles={roles}
        rolesLoading={rolesLoading}
        form={form}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />

      <UserDetailModal
        open={detailModalVisible}
        user={viewingUser}
        onCancel={handleDetailCancel}
      />
    </div>
  );
};

User.displayName = 'User';

export default User;
