from django.contrib.auth.models import User
from knox.models import AuthToken
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response

from .models import Profile, Membership
from .serializers import (
    LoginSerializer,
    ProfileSerializer,
    RegisterSerializer,
    UserSerializer,
    MembershipSerializer,
    TeamSerializer,
)


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": token,
            }
        )


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": token,
            }
        )


# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


# Get profile API
class ProfileAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile


# Membership API
class MembershipAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MembershipSerializer

    def perform_create(self, serializer):
        """Add member of the team"""
        serializer.save()
        return Response(serializer.data)

    def get_queryset(self):
        """Return memebers of given team"""
        team_id = self.request.data["team_id"]
        queryset = Membership.objects.get(team=team_id)
        return queryset


class TeamAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TeamSerializer

    def perform_create(self, serializer):
        """Add member of the team"""
        serializer.save(owner=self.request.user.profile)
        return Response(serializer.data)

    def get_queryset(self):
        """Return owned teams"""
        queryset = Membership.objects.get(owner=self.request.user.profile)
        return queryset
