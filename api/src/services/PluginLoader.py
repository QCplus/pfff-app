import os
from typing import Any, Callable, Optional

from src.services.abstract.QrCodeProcessorBase import QrCodeProcessorBase


class PluginLoader:
    def __init__(self, path_to_plugins: str) -> None:
        self.__path_to_plugins = path_to_plugins

    def _load_plugin_safe(self, plugin_name: str) -> Optional[Callable]:
        path_to_plugin = os.path.join(self.__path_to_plugins, plugin_name + '.py')

        if not os.path.exists(path_to_plugin):
            return None

        with open(path_to_plugin, 'r') as fin:
            source = fin.read()

        code = compile(source, plugin_name, 'exec')

        context = {}
        exec(code, context)

        return context[plugin_name]

    def load_qr_code_processor(self) -> QrCodeProcessorBase:
        processor = self._load_plugin_safe('QrCodeProcessor')

        if processor is None:
            return QrCodeProcessorBase()

        return processor()
        