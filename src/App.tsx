import { useState } from 'react';
import InventoryTable from './components/InventoryTable';
import AddItemForm from './components/AddItemForm';
import EditItemForm from './components/EditItemForm';
import FilterCategory from './components/FilterCategory';
import { Item } from "@/models/item";

function App() {
    const initialInventory: Item[] = [
        { id: 1, name: 'Laptop', category: 'Electronics', quantity: 5 },
        { id: 2, name: 'Notebook', category: 'Stationery', quantity: 20 },
        { id: 3, name: 'T-Shirt', category: 'Apparel', quantity: 15 },
        { id: 4, name: 'Mouse', category: 'Electronics', quantity: 8 },
        { id: 5, name: 'Pen', category: 'Stationery', quantity: 50 },
        { id: 6, name: 'Jeans', category: 'Apparel', quantity: 12 },
    ];

    const [inventory, setInventory] = useState<Item[]>(initialInventory);
    const [categories, setCategories] = useState<string[]>(['All', ...new Set(initialInventory.map(item => item.category))]);
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<'quantity-asc' | 'quantity-desc' | null>(null);
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [isAddItemFormVisible, setIsAddItemFormVisible] = useState<boolean>(false);

    // Filtered Inventory (based on category)
    const filteredInventory = filterCategory === 'All'
        ? inventory
        : inventory.filter(item => item.category === filterCategory);

    // Sorted Inventory (based on quantity)
    const sortedInventory = [...filteredInventory].sort((a, b) => {
        if (sortBy === 'quantity-asc') {
            return a.quantity - b.quantity;
        } else if (sortBy === 'quantity-desc') {
            return b.quantity - a.quantity;
        }
        return 0; // No sorting
    });

    // Handlers for adding, editing, deleting, filtering, sorting
    const handleAddItem = (newItem: Omit<Item, 'id'>) => {
        setInventory([...inventory, { ...newItem, id: Date.now() }]);
        setCategories(['All', ...new Set([...categories.slice(1), newItem.category])]);
        setIsAddItemFormVisible(false);
    };

    const handleEditItem = (updatedItem: Item) => {
        setInventory(inventory.map(item => item.id === updatedItem.id ? updatedItem : item));
        setCategories(['All', ...new Set([...categories.slice(1), updatedItem.category])]);
        setEditItemId(null);
    };

    const handleDeleteItem = (itemId: number) => {
        setInventory(inventory.filter(item => item.id !== itemId));
    };

    const handleFilterCategoryChange = (category: string) => {
        setFilterCategory(category);
    };

    const handleSortByQuantity = (order: 'quantity-asc' | 'quantity-desc' | null) => {
        setSortBy(order);
    };

    const handleEditClick = (itemId: number) => {
        setEditItemId(itemId);
    };

    const handleCancelEdit = () => {
        setEditItemId(null);
    };

    const handleShowAddItemForm = () => {
        setIsAddItemFormVisible(true);
    };

    const handleCancelAddItemForm = () => {
        setIsAddItemFormVisible(false);
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className='text-3xl mt-8'>🏭 Your Inventory ✍</div>

            <div className="controls">
                <FilterCategory
                    categories={categories}
                    selectedCategory={filterCategory}
                    onCategoryChange={handleFilterCategoryChange}
                />
                <button onClick={handleShowAddItemForm}>Add Item</button>
            </div>

            <InventoryTable
                inventory={sortedInventory}
                onDelete={handleDeleteItem}
                onEdit={handleEditClick}
                sortByQuantity={handleSortByQuantity}
                currentSort={sortBy}
            />

            {isAddItemFormVisible && (
                // Pass categories excluding "All"
                <AddItemForm onAddItem={handleAddItem} onCancel={handleCancelAddItemForm} categories={categories.slice(1)} /> 
            )}

            {editItemId !== null && (
                <EditItemForm
                    item={inventory.find(item => item.id === editItemId)}
                    onUpdateItem={handleEditItem}
                    onCancel={handleCancelEdit}
                    // Pass categories excluding "All"
                    categories={categories.slice(1)}
                />
            )}
        </div>
    );
}

export default App;
