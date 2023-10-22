import os
from typing import Callable, Optional, TypeVar

from src.models.AppSettings import AppSettings
from src.services.abstract.CloudSyncBase import CloudSyncBase
from src.services.abstract.QrCodeProcessorBase import QrCodeProcessorBase

T = TypeVar('T')


class PluginLoader:
    def __init__(self, path_to_plugins: str) -> None:
        self.__path_to_plugins = path_to_plugins

    def _load_plugin_safe(self, plugin_name: str) -> Optional[Callable]:
        path_to_plugin = os.path.join(
            self.__path_to_plugins, plugin_name + '.py')

        if not os.path.exists(path_to_plugin):
            return None

        with open(path_to_plugin, 'r') as fin:
            source = fin.read()

        code = compile(source, plugin_name, 'exec')

        context = {}
        exec(code, context)

        return context[plugin_name]

    def _load_or_default_plugin(self, plugin_name: str, default: T, **plugin_args) -> T:
        plugin = self._load_plugin_safe(plugin_name)

        if plugin is None:
            return default

        return plugin(**plugin_args)

    def load_qr_code_processor(self) -> QrCodeProcessorBase:
        return self._load_or_default_plugin(
            'QrCodeProcessor',
            QrCodeProcessorBase()
        )

    def load_cloud_sync(self, settings: AppSettings) -> CloudSyncBase:
        return self._load_or_default_plugin(
            'CloudSync',
            CloudSyncBase(),
            settings=settings
        )
