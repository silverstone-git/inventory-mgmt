import React, { useState, useEffect } from 'react';

interface EditItemFormProps {
    item: Item | undefined; // Item can be undefined initially or when not editing
    onUpdateItem: (updatedItem: Item) => void;
    onCancel: () => void;
    categories: string[];
}

interface Item {
    id: number;
    name: string;
    category: string;
    quantity: number;
}

function EditItemForm({ item, onUpdateItem, onCancel, categories }: EditItemFormProps) {
    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [quantity, setQuantity] = useState<string>(''); // Quantity as string initially

    useEffect(() => {
        if (item) {
            setName(item.name);
            setCategory(item.category);
            setQuantity(String(item.quantity));
        }
    }, [item]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !category || !quantity) {
            alert("Please fill in all fields.");
            return;
        }
        if (item) { // Ensure item is defined before using item.id
            onUpdateItem({ id: item.id, name, category, quantity: parseInt(quantity, 10) });
        }
    };

    return (
        <div className="edit-item-form">
            <h3>Edit Item</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="edit-name">Name:</label>
                    <input type="text" id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="edit-category">Category:</label>
                    <select id="edit-category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="edit-quantity">Quantity:</label>
                    <input type="number" id="edit-quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min={0} />
                </div>
                <div className="form-actions">
                    <button type="submit">Update Item</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditItemForm;
