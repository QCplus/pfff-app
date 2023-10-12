import { ModalFormAction, ModalFormActionType } from "./modal-form-actions";

export type ModalFormState = {
    isOpen: boolean;
    content?: React.ReactNode;
    title: string;
    openModal: (title: string, content: React.ReactNode) => void;
    closeModal: () => void;
}

export const modalFormReducer = (state: ModalFormState, action: ModalFormAction): ModalFormState => {
    switch (action.type) {
        case ModalFormActionType.OpenModal:
            return {
                ...state,
                isOpen: true,
                content: action.content,
                title: action.title ?? ''
            };
        case ModalFormActionType.CloseModal:
            return {
                ...state,
                isOpen: false
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}