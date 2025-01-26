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
            <div className='text-2xl font-bold'>Edit Item</div>
            <form onSubmit={handleSubmit}>
                <div className='mt-4 flex items-center justify-between'>
                    <label htmlFor="edit-name">Name:</label>
                    <input className='border border-blue-200 rounded py-2 px-3' type="text" id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='mt-4 flex items-center justify-between' >
                    <label htmlFor="edit-category">Category:</label>
                    <select className='border border-blue-200 rounded py-2 px-3' id="edit-category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <label htmlFor="edit-quantity">Quantity:</label>
                    <input className='border border-blue-200 rounded py-2 px-3' type="number" id="edit-quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min={0} />
                </div>
                <div className="mt-4 flex gap-4">
                    <button type="submit">Update Item</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditItemForm;
