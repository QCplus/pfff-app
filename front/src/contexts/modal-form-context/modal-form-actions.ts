export enum ModalFormActionType {
    OpenModal = 'openModal',
    CloseModal = 'closeModal'
}

export type ModalFormAction = {
    type: ModalFormActionType,
    title?: string,
    content?: React.ReactNode,
}