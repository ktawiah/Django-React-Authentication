from django.db import models
from django.contrib.auth.models import AbstractUser, UnicodeUsernameValidator
from uuid import uuid4
from django.utils.translation import gettext as _
from django.db.models.signals import post_save


class User(AbstractUser):
    """Model definition for User."""

    username_validator = UnicodeUsernameValidator()
    id = models.UUIDField(
        _("id"), primary_key=True, unique=True, default=uuid4, db_index=True
    )
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        validators=[username_validator],
        db_index=True,
    )
    email = models.EmailField(_("email address"), unique=True, db_index=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        """Meta definition for User."""

        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        """Unicode representation of User."""
        return self.username


class Profile(models.Model):
    """Model definition for Profile."""

    id = models.UUIDField(
        _("id"), primary_key=True, unique=True, default=uuid4, db_index=True
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    verified = models.BooleanField(_("verified"), default=False)
    image = models.ImageField(
        _("image"), upload_to="user_images", blank=True, null=True
    )

    @property
    def full_name(self):
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        """Meta definition for Profile."""

        verbose_name = "Profile"
        verbose_name_plural = "Profiles"

    def __str__(self):
        """Unicode representation of Profile."""
        return self.full_name


def create_user_profile(sender, created, instance, **kwargs):
    if created:
        Profile.objects.create(user=instance)


def save_user_profile(sender, instance, created, **kwargs):
    instance.profile.save()


post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)
