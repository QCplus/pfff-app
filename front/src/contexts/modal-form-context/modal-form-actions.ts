import ModalFormOptions from "./modal-form-options";

export enum ModalFormActionType {
    OpenModal = "openModal",
    CloseModal = "closeModal",
}

export type ModalFormAction = {
    type: ModalFormActionType;
    title?: string;
    content?: React.ReactNode;
    openOptions?: ModalFormOptions;
};
