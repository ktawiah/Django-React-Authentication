from users.models import User, Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """Serializer definition for the User model."""

    class Meta:
        model = User
        fields = ["id", "username", "email"]


class TokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token()

        token["full_name"] = user.profile.full_name
        token["email"] = user.email
        token["username"] = user.username
        token["bio"] = user.profile.bio
        token["image"] = user.profile.image
        token["verified"] = user.profile.verified

        return token


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer definition for the Register model."""

    password = serializers.CharField(
        write_only=True, validators=[validate_password], required=True
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "password",
            "password2",
        ]

        def validate_password(self, attrs):
            if attrs["password"] != attrs["password2"]:
                raise serializers.ValidationError(
                    {"password": "Password fields do not match."}
                )
            return attrs

        def create(self, validate_data):
            user = User.objects.create(
                username=validate_data["username"], email=validate_data["email"]
            )
            user.set_password(validate_data["password"])
            user.save()
            return user
