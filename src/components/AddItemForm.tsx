import { useState } from "react";
import { AddItemFormProps } from "@/models/props";


function AddItemForm({ onAddItem, onCancel, categories }: AddItemFormProps) {
    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>(categories[0] || ''); // Default to first category if available
    const [quantity, setQuantity] = useState<string>(''); // Quantity as string initially

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !category || !quantity) {
            alert("Please fill in all fields."); // Basic validation
            return;
        }
        onAddItem({ name, category, quantity: parseInt(quantity, 10) });
        setName('');
        setCategory(categories[0] || '');
        setQuantity('');
    };

    return (
        <div className="add-item-form">
            <div className='text-2xl font-bold'>Add New Item</div>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                <div className='mt-4 flex items-center justify-between'>
                    <label htmlFor="name">Name:</label>
                    <input className='border border-blue-200 rounded py-2 px-3 ml-4' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='mt-4 flex items-center justify-between'>
                    <label htmlFor="category">Category:</label>
                    <select className='border border-blue-200 rounded py-2 px-3 ml-4' id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        {categories.map((cat: string) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className='mt-4 flex items-center justify-between'>
                    <label htmlFor="quantity">Quantity:</label>
                    <input className='border border-blue-200 rounded py-2 px-3 ml-4' type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min={0} />
                </div>
                <div className="flex gap-4">
                    <button type="submit">Add Item</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddItemForm;
