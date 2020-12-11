from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import *

# Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            "first_name",
            "last_name",
        )


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "profile")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        if (
            validated_data["email"]
            and User.objects.filter(email=validated_data["email"])
            .exclude(username=validated_data["username"])
            .exists()
        ):
            raise serializers.ValidationError(
                "Użytkownik o podanym adresie email już istnieje", 400
            )

        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )

        profile_data = validated_data.pop("profile")

        profile = Profile.objects.create(
            user=user,
            first_name=profile_data["first_name"],
            last_name=profile_data["last_name"],
        )
        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("first_name", "last_name", "category", "subcategory")

    def update(self, instance, validated_data):
        profile = Profile.objects.update(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            category=validated_data["category"],
            subcategory=validated_data["subcategory"]
            # nip = profile_data['nip'],
        )


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = "__all__"


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"
