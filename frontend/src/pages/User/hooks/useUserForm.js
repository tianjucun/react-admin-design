import { useState, useCallback } from 'react';
import { message } from 'antd';
import {
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
} from '@/api/user';

/**
 * 用户表单业务逻辑 Hook
 * 负责用户创建、更新、删除、状态变更等业务逻辑
 */
const useUserForm = (onSuccess) => {
  const [loading, setLoading] = useState(false);

  // 创建用户
  const handleCreateUser = useCallback(
    async (values) => {
      setLoading(true);
      try {
        await createUser(values);
        message.success('创建成功');
        onSuccess?.();
        return true;
      } catch (error) {
        message.error(error.message || '创建失败');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [onSuccess]
  );

  // 更新用户
  const handleUpdateUser = useCallback(
    async (id, values) => {
      setLoading(true);
      try {
        await updateUser(id, values);
        message.success('更新成功');
        onSuccess?.();
        return true;
      } catch (error) {
        message.error(error.message || '更新失败');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [onSuccess]
  );

  // 删除用户
  const handleDeleteUser = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await deleteUser(id);
        message.success('删除成功');
        onSuccess?.();
        return true;
      } catch (error) {
        message.error(error.message || '删除失败');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [onSuccess]
  );

  // 更新用户状态
  const handleUpdateUserStatus = useCallback(
    async (id, status) => {
      setLoading(true);
      try {
        await updateUserStatus(id, status);
        message.success('状态更新成功');
        onSuccess?.();
        return true;
      } catch (error) {
        message.error(error.message || '更新失败');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [onSuccess]
  );

  // 统一的提交处理函数（根据是否有 editingUser 判断是创建还是更新）
  const handleSubmit = useCallback(
    async (editingUser, values) => {
      if (editingUser) {
        return await handleUpdateUser(editingUser.id, values);
      } else {
        return await handleCreateUser(values);
      }
    },
    [handleCreateUser, handleUpdateUser]
  );

  return {
    loading,
    createUser: handleCreateUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    updateUserStatus: handleUpdateUserStatus,
    handleSubmit,
  };
};

export default useUserForm;
