import { useState, useCallback } from 'react';

/**
 * 用户模态框业务逻辑 Hook
 * 负责模态框的显示/隐藏、编辑状态管理、表单初始化等逻辑
 */
const useUserModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // 详情模态框相关状态
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);

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
