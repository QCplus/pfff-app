import os

from src.services.abstract.QrCodeProcessorBase import QrCodeProcessorBase


class PluginLoader:
    def __init__(self, path_to_plugins: str) -> None:
        self.__path_to_plugins = path_to_plugins

    def load_plugin(self, plugin_name: str):
        with open(os.path.join(self.__path_to_plugins, plugin_name + '.py'), 'r') as fin:
            source = fin.read()

        code = compile(source, plugin_name, 'exec')

        context = {}
        exec(code, context)

        return context[plugin_name]

    def load_qr_code_processor(self) -> QrCodeProcessorBase:
        return self.load_plugin('QrCodeProcessor')()
        