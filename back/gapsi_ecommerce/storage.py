import json


class Storage:
    def __init__(self, filename):
        self.filename = filename

    def save(self, providers):
        with open(self.filename, 'w') as file:
            json.dump(providers, file, indent=4)

    def load(self):
        try:
            with open(self.filename, 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            return []
        except json.JSONDecodeError:
            return []

    def append(self, provider):
        providers = self.load()
        providers.append(provider)
        self.save(providers)

    def delete_by_name(self, name):
        providers = self.load()
        updated_providers = [provider for provider in providers if provider.get("name") != name]

        if len(providers) != len(updated_providers):
            self.save(updated_providers)
            return True
        return False


storage = Storage('bd.json')
