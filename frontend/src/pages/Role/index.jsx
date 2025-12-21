import { useCallback } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import RoleTable from './components/RoleTable';
import { useRoleList } from './hooks/useRoleList';
import useRoleForm from './hooks/useRoleForm';
import useRoleModal from './hooks/useRoleModal';
import RoleModal from './components/RoleModal';
import RoleAssignPermissionsModal from './components/RoleAssignPermissionsModal';
import useRoleAssignPermissionsTree from './hooks/useRoleAssignPermissionsTree';

const Role = () => {
  const { dataSource, loading, pagination, handlePageChange, refresh } =
    useRoleList();
  const {
    modalVisible,
    editingRole,
    openRoleModal,
    closeRoleModal,
    /* 权限分配相关 */
    permissionModalVisible,
    openPermissionModal,
    closePermissionModal,
    checkedKeys,
    setCheckedKeys,
    menuTree,
    editPermissionRoleId,
  } = useRoleModal();
  const {
    form,
    loading: submitRoleIsLoading,
    submitRole,
    deleteRole,
  } = useRoleForm();

  const handleDeleteRole = useCallback(
    async (id) => {
      const success = await deleteRole(id);
      if (success) {
        refresh();
      }
    },
    [deleteRole, refresh]
  );

  // 打开编辑弹窗
  const handleEdit = useCallback(
    (record) => {
      openRoleModal(record);
    },
    [openRoleModal]
  );

  const handleSubmitSuccess = useCallback(
    async (values) => {
      const success = await submitRole(editingRole?.id, values);
      if (success) {
        closeRoleModal();
        refresh();
      }
    },
    [editingRole, submitRole, closeRoleModal, refresh]
  );

  const { loading: assignPermissionsLoading, savePermissions } =
    useRoleAssignPermissionsTree({
      editingRoleId: editPermissionRoleId,
      checkedKeys,
      onSuccess: () => {
        closePermissionModal();
        refresh();
      },
    });

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => {
            openRoleModal();
          }}
        >
          新增角色
        </Button>
      </div>
      <RoleTable
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        total={pagination.total}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
        onAssignPermissions={openPermissionModal}
        onDelete={handleDeleteRole}
      />
      <RoleModal
        form={form}
        loading={submitRoleIsLoading}
        open={modalVisible}
        onCancel={closeRoleModal}
        onSubmit={handleSubmitSuccess}
        editingRole={editingRole}
      />
      <RoleAssignPermissionsModal
        open={permissionModalVisible}
        onCancel={closePermissionModal}
        onSavePermissions={savePermissions}
        loading={assignPermissionsLoading}
        checkedKeys={checkedKeys}
        handleCheckChange={setCheckedKeys}
        menuTree={menuTree}
      />
    </div>
  );
};

export default Role;
