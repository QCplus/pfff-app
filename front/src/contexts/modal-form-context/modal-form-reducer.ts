import { ModalFormAction, ModalFormActionType } from "./modal-form-actions";
import ModalFormOptions from "./modal-form-options";

export type ModalFormState = {
    isOpen: boolean;
    content?: React.ReactNode;
    title: string;
    clearOnClose: boolean;
    openModal: (
        title: string,
        content: React.ReactNode,
        openOptions?: ModalFormOptions
    ) => void;
    closeModal: () => void;
    updateModalContent: (content: React.ReactNode, title?: string) => void;
};

export const modalFormReducer = (
    state: ModalFormState,
    action: ModalFormAction
): ModalFormState => {
    switch (action.type) {
        case ModalFormActionType.OpenModal:
            return {
                ...state,
                isOpen: true,
                content: action.content,
                title: action.title ?? "",
                clearOnClose: action.openOptions?.clearOnClose ?? false,
            };
        case ModalFormActionType.CloseModal:
            return {
                ...state,
                isOpen: false,
                content: state.clearOnClose ? null : state.content,
            };
        case ModalFormActionType.UpdateModalContent:
            return {
                ...state,
                content: action.content,
                title: action.title ?? state.title,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};
