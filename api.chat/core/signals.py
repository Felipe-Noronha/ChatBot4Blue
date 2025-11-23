from django.apps import apps

def create_default_users(sender, **kwargs):
    User = apps.get_model('core', 'User')

    if User.objects.count() == 0:
        User.objects.get_or_create(id=1, defaults={"name": "Usuário A"})
        User.objects.get_or_create(id=2, defaults={"name": "Usuário B"})
