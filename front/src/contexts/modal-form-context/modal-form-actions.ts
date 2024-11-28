import ModalFormOptions from "./modal-form-options";

export enum ModalFormActionType {
    OpenModal = "openModal",
    CloseModal = "closeModal",
    UpdateModalContent = "updateModalContent",
}

export type ModalFormAction = {
    type: ModalFormActionType;
    title?: string;
    content?: React.ReactNode;
    openOptions?: ModalFormOptions;
};
