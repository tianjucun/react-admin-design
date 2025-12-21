import { useState, useCallback } from 'react';
import * as roleApi from '../../../api/role';
import { message } from 'antd';

const useRoleAssignPermissionsTree = ({
  editingRoleId,
  checkedKeys,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const handleSavePermissions = useCallback(async () => {
    setLoading(true);
    try {
      await roleApi.assignPermissions(editingRoleId, checkedKeys);
      message.success('权限分配成功');
      onSuccess();
    } catch (err) {
      message.error(err.message || '权限分配失败');
    } finally {
      setLoading(false);
    }
  }, [checkedKeys, editingRoleId, onSuccess]);

  return {
    loading,
    savePermissions: handleSavePermissions,
  };
};

export default useRoleAssignPermissionsTree;
