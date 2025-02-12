const Search = ({ searchTerm, handleSearchTerm }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchTerm}
      />
    </div>
  );
};

export { Search };
