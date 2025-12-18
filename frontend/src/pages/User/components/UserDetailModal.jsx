import { memo } from 'react';
import { Modal, Descriptions, Button } from 'antd';
import { formatUserStatus } from '../utils/formatters';

/**
 * 用户详情模态框组件
 * 负责展示用户的完整信息
 */
const UserDetailModal = memo(({
  open,
  user,
  onCancel
}) => {
  if (!user) {
    return null;
  }

  const { text, color } = formatUserStatus(user.status);

  // 详情数据配置
  const detailItems = [
    {
      key: 'id',
      label: '用户编号',
      children: user.id
    },
    {
      key: 'username',
      label: '用户名',
      children: user.username || '-'
    },
    {
      key: 'nickname',
      label: '用户姓名',
      children: user.nickname || user.username || '-'
    },
    {
      key: 'email',
      label: '用户邮箱',
      children: user.email || '-'
    },
    {
      key: 'role',
      label: '用户角色',
      children: user.role?.name || '-'
    },
    {
      key: 'status',
      label: '用户状态',
      children: <span style={{ color }}>{text}</span>
    },
    {
      key: 'createdAt',
      label: '创建时间',
      children: user.createdAt ? new Date(user.createdAt).toLocaleString('zh-CN') : '-'
    },
    {
      key: 'updatedAt',
      label: '更新时间',
      children: user.updatedAt ? new Date(user.updatedAt).toLocaleString('zh-CN') : '-'
    }
  ];

  return (
    <Modal
      title="用户详情"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          关闭
        </Button>
      ]}
      width={600}
      destroyOnHidden
    >
      <Descriptions
        column={1}
        bordered
        size="middle"
      >
        {detailItems.map(item => (
          <Descriptions.Item key={item.key} label={item.label}>
            {item.children}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Modal>
  );
});

UserDetailModal.displayName = 'UserDetailModal';

export default UserDetailModal;

