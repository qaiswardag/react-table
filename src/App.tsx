import ItemsTable from './components/ItemsTable';
import React from 'react';

function App() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <div className="border border-gray-200 rounded min-h-screen">
        <ItemsTable></ItemsTable>
      </div>
    </div>
  );
}

export default App;
