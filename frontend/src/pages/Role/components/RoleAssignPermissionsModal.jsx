import { memo } from 'react';
import { Modal, Tree } from 'antd';

const RoleAssignPermissionsModal = memo(
  ({ open,
    onCancel,
    onSavePermissions,
    loading = false,
    checkedKeys = [],
    handleCheckChange,
    menuTree = [],
  }) => {
    return (
      <Modal
        title='分配权限'
        width={600}
        open={open}
        onCancel={onCancel}
        onOk={onSavePermissions}
        destroyOnHidden
        okButtonProps={{ loading }}
      >
        <Tree
          checkable
          checkedKeys={checkedKeys}
          onCheck={handleCheckChange}
          treeData={menuTree}
        />
      </Modal>
    );
  }
);

RoleAssignPermissionsModal.displayName = 'RoleAssignPermissionsModal';
export default RoleAssignPermissionsModal;