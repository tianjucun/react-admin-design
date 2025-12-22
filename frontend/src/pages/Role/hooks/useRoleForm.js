import { useState, useCallback } from 'react';
import { Form, message } from 'antd';

const useRoleForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const createRole = useCallback(async (values) => {
    setLoading(true);
    try {
      await createRole(values);
      message.success('创建成功');
      return true;
    } catch (err) {
      message.error(err.message || '创建失败');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRole = useCallback(async (id, values) => {
    setLoading(true);
    try {
      await updateRole(id, values);
      message.success('更新成功');
      return true;
    } catch (err) {
      message.error(err.message || '更新失败');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitRole = useCallback(
    async (editingRoleId, values) => {
      if (editingRoleId) {
        return await updateRole(editingRoleId, values);
      } else {
        return await createRole(values);
      }
    },
    [createRole, updateRole]
  );

  const deleteRole = useCallback(async (id) => {
    setLoading(true);
    try {
      await deleteRole(id);
      message.success('删除成功');
      return true;
    } catch (err) {
      message.error(err.message || '删除失败');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    form,
    submitRole,
    deleteRole,
  };
};

export default useRoleForm;
