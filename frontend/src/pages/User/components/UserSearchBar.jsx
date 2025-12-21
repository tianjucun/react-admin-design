import { Input, Space } from 'antd';
import { memo } from 'react';

/**
 * 用户搜索栏组件
 * 负责用户搜索功能的 UI 展示
 */
const UserSearchBar = memo(({ onSearch, keyword }) => {
  return (
    <Space>
      <Input.Search
        placeholder="搜索用户名、昵称、邮箱"
        style={{ width: 300 }}
        onSearch={onSearch}
        allowClear
        defaultValue={keyword}
      />
    </Space>
  );
});

UserSearchBar.displayName = 'UserSearchBar';

export default UserSearchBar;

