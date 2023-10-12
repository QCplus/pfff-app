from pydantic import BaseModel

def uncapitalize(string: str):
    return string[0].lower() + string[1:]

def to_camel(string: str):
    return uncapitalize(''.join([s.capitalize() for s in string.split('_')]))

class CamelModel(BaseModel):
    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True