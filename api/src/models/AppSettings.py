import json
import os

from src.services.TokenGenerator import TokenGenerator


class AppSettings:
    FIELD_SECRET_KEY = 'secret_key'
    FIELD_HOST = 'host'
    FIELD_PORT = 'port'
    FIELD_TOKEN_LIFETIME = 'token_lifetime_mins'

    secret_key: str
    host: str
    port: int
    token_lifetime_mins: int

    def __init__(self, path_to_config: str) -> None:
        config = {}

        if os.path.exists(path_to_config):
            with open(path_to_config, 'r') as fin:
                config: dict = json.loads(fin.read())
    
        self.secret_key = config.get(self.FIELD_SECRET_KEY, TokenGenerator.generate_secret_key())
        self.host = config.get(self.FIELD_HOST, '192.168.0.1')
        self.port = config.get(self.FIELD_PORT, 8000)
        self.token_lifetime_mins = config.get(self.FIELD_TOKEN_LIFETIME, 30 * 24 * 60)

        with open(path_to_config, 'w+') as fout:
            fout.write(json.dumps(
                {
                    self.FIELD_HOST: self.host,
                    self.FIELD_PORT: self.port,
                    self.FIELD_SECRET_KEY: self.secret_key,
                    self.FIELD_TOKEN_LIFETIME: self.token_lifetime_mins,
                }, indent=4))
