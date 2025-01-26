
interface FilterCategoryProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

function FilterCategory({ categories, selectedCategory, onCategoryChange }: FilterCategoryProps) {
    return (
        <div className="filter-category">
            <label htmlFor="category-filter">Filter by Category:</label>
            <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
}

export default FilterCategory;
