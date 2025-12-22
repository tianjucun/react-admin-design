import { useState, useEffect, useCallback, useRef } from 'react';
import { Form } from 'antd';
import { getRoleList } from '@/api/role';

/**
 * 用户模态框业务逻辑 Hook
 * 负责模态框的显示/隐藏、编辑状态管理、表单初始化等逻辑
 */
const useUserModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // 角色列表相关状态（按需加载）
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const rolesCacheRef = useRef(null); // 缓存角色列表，避免重复请求
  const loadingRef = useRef(false); // 使用 ref 跟踪加载状态，避免依赖问题

  // 详情模态框相关状态
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);

  // 获取角色列表（带缓存）
  const fetchRoles = useCallback(async () => {
    // 如果已有缓存，直接使用
    if (rolesCacheRef.current) {
      setRoles(rolesCacheRef.current);
      return;
    }

    // 如果正在加载，不重复请求
    if (loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setRolesLoading(true);
    try {
      const roleList = await getRoleList({
        page: 1,
        pageSize: Number.MAX_SAFE_INTEGER,
      });
      const rolesData = roleList.list || [];
      setRoles(rolesData);
      rolesCacheRef.current = rolesData; // 缓存结果
    } catch (error) {
      console.error('获取角色列表失败:', error);
      setRoles([]);
    } finally {
      loadingRef.current = false;
      setRolesLoading(false);
    }
  }, []);

  // 当 Modal 打开时，按需加载角色列表
  useEffect(() => {
    if (modalVisible) {
      fetchRoles();
    }
  }, [modalVisible, fetchRoles]);

  // 打开新增弹窗
  const handleAdd = useCallback(() => {
    setEditingUser(null);
    setModalVisible(true);
  }, []);

  // 打开编辑弹窗
  const handleEdit = useCallback((record) => {
    setEditingUser(record);
    setModalVisible(true);
  }, []);

  // 打开详情弹窗
  const handleView = useCallback((record) => {
    setViewingUser(record);
    setDetailModalVisible(true);
  }, []);

  // 关闭编辑弹窗
  const handleCancel = useCallback(() => {
    setModalVisible(false);
    setEditingUser(null);
  }, []);

  // 关闭详情弹窗
  const handleDetailCancel = useCallback(() => {
    setDetailModalVisible(false);
    setViewingUser(null);
  }, []);

  // 处理提交成功后的清理
  const handleSubmitSuccess = useCallback(() => {
    setModalVisible(false);
    setEditingUser(null);
  }, []);

  return {
    // 编辑模态框
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
    handleDetailCancel,
  };
};

export default useUserModal;
