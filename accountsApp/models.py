from django.db import models
from django.contrib.auth.models import User


class profileInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    darkMode = models.BooleanField(default=False)
    private = models.BooleanField(default=True)

    def __str__(self):
        return self.user.get_username()
