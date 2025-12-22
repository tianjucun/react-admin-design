import { useState, useCallback } from 'react';
import { Form, message } from 'antd';
import { createMenu, updateMenu, deleteMenu } from '@/api/menu';

const useMenuForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCreateMenu = useCallback(async (values) => {
    try {
      await createMenu(values);
      message.success('创建成功');
      return true;
    } catch (err) {
      message.error(err.message || '创建失败');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateMenu = useCallback(async (id, menu) => {
    try {
      await updateMenu(id, menu);
      message.success('更新成功');
      return true;
    } catch (err) {
      message.error(err.message || '更新失败');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async (editingMenuId, values) => {
      setLoading(true);
      if (editingMenuId) {
        return await handleUpdateMenu(editingMenuId, values);
      }
      return await handleCreateMenu(values);
    },
    [handleCreateMenu, handleUpdateMenu]
  );

  const handleDeleteMenu = useCallback(async (id) => {
    try {
      await deleteMenu(id);
      message.success('删除成功');
      return true;
    } catch (err) {
      message.error(err.message || '删除失败');
      return false;
    }
  }, []);

  return {
    form,
    loading,
    submitMenu: handleSubmit,
    deleteMenu: handleDeleteMenu,
  };
};

export default useMenuForm;
