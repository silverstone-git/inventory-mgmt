import { Item } from "@/models/item";

export interface InventoryTableProps {
    inventory: Item[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    sortByQuantity: (order: 'quantity-asc' | 'quantity-desc' | null) => void;
    currentSort: 'quantity-asc' | 'quantity-desc' | null;
}

export interface AddItemFormProps {
    onAddItem: (newItem: Omit<Item, 'id'>) => void; // Expects Item without id
    onCancel: () => void;
    categories: string[];
}
