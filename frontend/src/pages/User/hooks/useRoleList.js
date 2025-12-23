import { getAllRoles } from '@/api/role';
import { useCallback, useRef, useState, useEffect } from 'react';
import { message } from 'antd';

export const useRoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const rolesCacheRef = useRef(null);

  const fetchRoles = useCallback(async () => {
    if (rolesCacheRef.current) {
      setRoles(rolesCacheRef.current);
      return;
    }

    // 如果正在加载，不重复请求
    if (loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    try {
      const result = await getAllRoles();
      const list = result || [];
      setRoles(list);
      rolesCacheRef.current = list;
    } catch (err) {
      message.error(err.message || '获取角色列表失败');
      setRoles([]);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return {
    roles,
    loading,
    fetchRoles,
  };
};
