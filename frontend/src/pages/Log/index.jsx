import LogSearchBar from './components/LogSearchBar';
import useLogList from './hooks/useLogList';
import LogTable from './components/LogTable';

const Log = () => {
  const {
    dataSource,
    loading,
    pagination,
    handleReset,
    handleSearch,
    searchForm,
  } = useLogList();

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <LogSearchBar
          form={searchForm}
          onReset={handleReset}
          onSearch={handleSearch}
        />
      </div>

      <LogTable
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
      />
    </div>
  );
};

export default Log;

