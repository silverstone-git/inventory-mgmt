import { Item } from "@/models/item";
import { InventoryTableProps } from "@/models/props";


function InventoryTable({ inventory, onDelete, onEdit, sortByQuantity, currentSort }: InventoryTableProps) {

    const handleSortClick = (order: 'quantity-asc' | 'quantity-desc' | null) => {
        sortByQuantity(order);
    };

    return (
        <div>
            <table className="w-full border-collapse rounded-xl overflow-hidden">
                <thead>
                    <tr>
                        <th className="text-white rounded-tl-xl">Name</th>
                        <th className="text-white">Category</th>
                        <th className="text-white">
                            Quantity
                            <button className="filter-button" onClick={() => handleSortClick('quantity-asc')} disabled={currentSort === 'quantity-asc'}>▲</button>
                            <button className="filter-button" onClick={() => handleSortClick('quantity-desc')} disabled={currentSort === 'quantity-desc'}>▼</button>
                            <button className="filter-button" onClick={() => handleSortClick(null)} disabled={!currentSort}>↺</button>
                        </th>
                        <th className="text-white rounded-tr-xl">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/*
                      TODO: bottom cells not rounded
                    */}
                    {inventory.map((item: Item, ind: number) => (
                        <tr key={item.id} className={(ind % 2 == 1 ? " bg-blue-200 " : "") + (ind == inventory.length - 1 ? " rounded-bl-xl rounded-br-xl " : "") + (item.quantity < 10 ? 'low-stock' : '')}>
               
                            <td className={(ind == inventory.length - 1 ? "rounded-bl-xl" : " ")}>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td className={"" + (ind == inventory.length - 1 ? "rounded-br-xl" : "")}>
                                <div className="mr-4 inline cursor-pointer text-blue-500 hover:text-blue-700 hover:underline transition-colors" onClick={() => onEdit(item.id)}>Edit</div>
                                <div className="inline cursor-pointer text-blue-500 hover:text-blue-700 hover:underline transition-colors" onClick={() => onDelete(item.id)}>Delete</div>
                            </td>
                        </tr>
                    ))}
                    {inventory.length === 0 && (
                        <tr><td colSpan={4}>No items in inventory.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryTable;
