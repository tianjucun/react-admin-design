import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Tree, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import * as roleApi from '../../api/role';
import * as menuApi from '../../api/menu';

const Role = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [menuTree, setMenuTree] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [form] = Form.useForm();

  // 获取角色列表
  const fetchRoleList = async () => {
    setLoading(true);
    try {
      const roles = await roleApi.getRoleList();
      setDataSource(roles);
    } catch (error) {
      message.error('获取角色列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoleList();
  }, []);

  // 获取菜单树
  const fetchMenuTree = async () => {
    try {
      const menus = await menuApi.getAllMenus();
      const treeData = buildTreeData(menus);
      setMenuTree(treeData);
    } catch (error) {
      message.error('获取菜单列表失败');
    }
  };

  // 构建树形数据
  const buildTreeData = (menus) => {
    const map = {};
    const roots = [];

    menus.forEach(menu => {
      map[menu.id] = {
        title: menu.name,
        key: menu.id,
        children: []
      };
    });

    menus.forEach(menu => {
      if (menu.parentId === 0) {
        roots.push(map[menu.id]);
      } else {
        if (map[menu.parentId]) {
          map[menu.parentId].children.push(map[menu.id]);
        }
      }
    });

    return roots;
  };

  // 创建/更新角色
  const handleSubmit = async (values) => {
    try {
      if (editingRole) {
        await roleApi.updateRole(editingRole.id, values);
        message.success('更新成功');
      } else {
        await roleApi.createRole(values);
        message.success('创建成功');
      }
      setModalVisible(false);
      setEditingRole(null);
      form.resetFields();
      fetchRoleList();
    } catch (error) {
      message.error(error.message || '操作失败');
    }
  };

  // 删除角色
  const handleDelete = async (id) => {
    try {
      await roleApi.deleteRole(id);
      message.success('删除成功');
      fetchRoleList();
    } catch (error) {
      message.error(error.message || '删除失败');
    }
  };

  // 打开编辑弹窗
  const handleEdit = (record) => {
    setEditingRole(record);
    form.setFieldsValue({
      name: record.name,
      code: record.code,
      description: record.description
    });
    setModalVisible(true);
  };

  // 打开权限分配弹窗
  const handleAssignPermissions = async (record) => {
    setEditingRole(record);
    try {
      const detail = await roleApi.getRoleDetail(record.id);
      setCheckedKeys(detail.menuIds || []);
      await fetchMenuTree();
      setPermissionModalVisible(true);
    } catch (error) {
      message.error('获取角色权限失败');
    }
  };

  // 保存权限
  const handleSavePermissions = async () => {
    try {
      await roleApi.assignPermissions(editingRole.id, checkedKeys);
      message.success('权限分配成功');
      setPermissionModalVisible(false);
      setEditingRole(null);
      setCheckedKeys([]);
    } catch (error) {
      message.error(error.message || '权限分配失败');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            onClick={() => handleAssignPermissions(record)}
          >
            分配权限
          </Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingRole(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          新增角色
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingRole ? '编辑角色' : '新增角色'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingRole(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          <Form.Item
            name="code"
            label="角色编码"
            rules={[{ required: true, message: '请输入角色编码' }]}
          >
            <Input placeholder="请输入角色编码" />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea placeholder="请输入描述" rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="分配权限"
        open={permissionModalVisible}
        onCancel={() => {
          setPermissionModalVisible(false);
          setEditingRole(null);
          setCheckedKeys([]);
        }}
        onOk={handleSavePermissions}
        width={600}
      >
        <Tree
          checkable
          checkedKeys={checkedKeys}
          onCheck={setCheckedKeys}
          treeData={menuTree}
        />
      </Modal>
    </div>
  );
};

export default Role;

