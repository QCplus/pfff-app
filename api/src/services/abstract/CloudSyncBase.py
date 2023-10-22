from abc import ABC


class CloudSyncBase(ABC):
    def save_data(self) -> None:
        raise NotImplementedError()
