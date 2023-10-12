from abc import ABC
from typing import Dict, List


class QrCodeProcessorBase(ABC):
    def process_qr_code(self, code: str) -> List[Dict]:
        raise NotImplementedError()
