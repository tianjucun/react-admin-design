import { useState, useCallback } from 'react';
import { message } from 'antd';
import * as roleApi from '../../../api/role';
import * as menuApi from '../../../api/menu';

const useRoleModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [menuTree, setMenuTree] = useState([]);
  const [editPermissionRoleId, setEditPermissionRoleId] = useState(null);

  const openRoleModal = useCallback((record = null) => {
    setEditingRole(record);
    setModalVisible(true);
  }, []);

  const closeRoleModal = useCallback(() => {
    setEditingRole(null);
    setModalVisible(false);
  }, []);

  // 构建树形数据
  const buildTreeData = useCallback((menus) => {
    const map = {};
    const roots = [];

    menus.forEach((menu) => {
      map[menu.id] = {
        title: menu.name,
        key: menu.id,
        children: [],
      };
    });

    menus.forEach((menu) => {
      if (menu.parentId === 0) {
        roots.push(map[menu.id]);
      } else {
        if (map[menu.parentId]) {
          map[menu.parentId].children.push(map[menu.id]);
        }
      }
    });

    return roots;
  }, []);

  const fetchMenuTree = useCallback(async () => {
    try {
      const menus = await menuApi.getAllMenus();
      const treeData = buildTreeData(menus);
      setMenuTree(treeData);
    } catch (error) {
      message.error('获取菜单列表失败');
    }
  }, [buildTreeData]);

  const openPermissionModal = useCallback(
    async (record) => {
      try {
        const detail = await roleApi.getRoleDetail(record.id);
        setCheckedKeys(detail.menuIds || []);
        await fetchMenuTree();
        setPermissionModalVisible(true);
        setEditPermissionRoleId(record.id);
      } catch (err) {
        console.error(err);
        message.error('获取角色权限失败');
      }
    },
    [fetchMenuTree]
  );

  const closePermissionModal = useCallback(() => {
    setPermissionModalVisible(false);
    setCheckedKeys([]);
  }, []);

  return {
    modalVisible,
    editingRole,
    openRoleModal,
    closeRoleModal,
    /* 权限分配相关 */
    menuTree,
    checkedKeys,
    permissionModalVisible,
    editPermissionRoleId,
    openPermissionModal,
    closePermissionModal,
    setCheckedKeys,
  };
};

export default useRoleModal;
