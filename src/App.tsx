import ItemsTable from './components/ItemsTable';
import FilterTable from './components/FilterTable';
import React from 'react';

function App() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <div className="border border-gray-200 rounded min-h-screen flex flex-col gap-12 p-2">
        <h1 className="text-2xl pt-8 text-center font-bold">
          TanStack React Table
        </h1>
        <div className="py-8 px-4 border-2 border-emerald-500 rounded">
          <FilterTable></FilterTable>
        </div>
        <div className="py-8 px-4 border-2 border-black rounded">
          {true && <ItemsTable></ItemsTable>}
        </div>
      </div>
    </div>
  );
}

export default App;
