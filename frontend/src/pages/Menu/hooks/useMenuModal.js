import { useState, useCallback } from 'react';

const useMenuModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  const openModal = useCallback((menu = null) => {
    setEditingMenu(menu);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setEditingMenu(null);
    setModalVisible(false);
  }, []);

  return {
    modalVisible,
    editingMenu,
    openModal,
    closeModal,
  };
};

export default useMenuModal;
