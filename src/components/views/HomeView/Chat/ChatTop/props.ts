export const props = defineProps<{
selectMode: boolean;
selectAll: boolean;
handleSelectAll: () => void;
handleDeselectAll: () => void;
handleCloseSelect: () => void;
}>();
