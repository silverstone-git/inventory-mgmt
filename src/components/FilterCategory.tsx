
interface FilterCategoryProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

function FilterCategory({ categories, selectedCategory, onCategoryChange }: FilterCategoryProps) {
    return (
        <div className="flex gap-4 items-center">
            <label htmlFor="category-filter text-lg">Filter by Category:</label>
            <select
                id="category-filter"
                value={selectedCategory}
                className="rounded-full bg-blue-200 pl-4 py-2"
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
