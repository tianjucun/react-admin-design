import { useCallback } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useMenuList from './hooks/useMenuList';
import MenuTable from './components/MenuTable';
import MenuModal from './components/MenuModal';
import useMenuModal from './hooks/useMenuModal';
import useMenuForm from './hooks/useMenuForm';

const Menu = () => {
  const { dataSource, loading, parentMenus, refresh } = useMenuList();
  const { modalVisible, editingMenu, openModal, closeModal } = useMenuModal();
  const { form, loading: submitMenuIsLoading, submitMenu, deleteMenu } = useMenuForm();

  const handleDelete = useCallback(async (id) => {
    const success = await deleteMenu(id);
    if (success) {
      refresh();
    }
  }, [refresh, deleteMenu]);

  const handleSubmitSuccess = useCallback(async (values) => {
    const success = await submitMenu(editingMenu?.id, values);
    if (success) {
      closeModal();
      refresh();
    }
  }, [refresh, editingMenu, submitMenu, closeModal]);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          新增菜单
        </Button>
      </div>
      <MenuTable
        dataSource={dataSource}
        loading={loading}
        onEdit={openModal}
        onDelete={handleDelete}
      />
      <MenuModal
        parentMenus={parentMenus}
        editingMenu={editingMenu}
        form={form}
        loading={submitMenuIsLoading}
        open={modalVisible}
        onCancel={closeModal}
        onSubmit={handleSubmitSuccess}
      />
    </div>
  );
};

export default Menu;

