import '../css/FilterBar.css';

function FilterBar({
    search,
    setSearch,
    category,
    setCategory,
    location,
    setLocation,
    price,
    setPrice,
    categories,
    locations
}) {
    return (
        <div className="filter-bar">

            <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">All Categories</option>

                {categories.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            >
                <option value="">All Locations</option>

                {locations.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            >
                <option value="">Any Price</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
            </select>

        </div>
    );
}

export default FilterBar;